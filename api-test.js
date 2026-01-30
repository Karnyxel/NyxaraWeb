// test-api-v2-completo.js
const https = require('https');
const http = require('http');

// ================= CONFIGURACIÓN =================
const BOT_API_URL = 'http://103.195.101.224:3001'; // Tu IP:Puerto
const BOT_API_KEY = 'tu_clave_secreta_para_la_web';      // Clave authenticated
const BOT_ADMIN_API_KEY = 'tu_clave_admin_super_secreta';   // Clave admin (cámbiala en .env!)

// Colores para consola
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

// ================= FUNCIONES AUXILIARES =================
function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        
        const req = protocol.request(url, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            timeout: 15000
        }, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({
                        status: res.statusCode,
                        statusText: res.statusMessage,
                        headers: res.headers,
                        data: parsed
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        statusText: res.statusMessage,
                        headers: res.headers,
                        data: data
                    });
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timeout (15s)'));
        });
        
        if (options.body) {
            req.write(JSON.stringify(options.body));
        }
        
        req.end();
    });
}

function printSection(title) {
    console.log(`\n${colors.cyan}${'='.repeat(70)}${colors.reset}`);
    console.log(`${colors.bright}${colors.yellow}${title}${colors.reset}`);
    console.log(`${colors.cyan}${'='.repeat(70)}${colors.reset}`);
}

function printResult(endpoint, status, authLevel = null) {
    const statusColor = status >= 200 && status < 300 ? colors.green : 
                       status === 401 ? colors.yellow : colors.red;
    const authStr = authLevel ? ` [${colors.magenta}${authLevel}${colors.reset}]` : '';
    
    console.log(`  ${colors.blue}${endpoint.padEnd(40)}${colors.reset} -> ${statusColor}${status}${colors.reset}${authStr}`);
}

async function testEndpoint(endpoint, authConfig = {}, method = 'GET', body = null) {
    const { level = 'public', key = null } = authConfig;
    
    const headers = {};
    if (key) {
        headers['X-API-Key'] = key;
    }
    
    try {
        const response = await makeRequest(`${BOT_API_URL}${endpoint}`, {
            method,
            headers,
            body
        });
        
        printResult(endpoint, response.status, level);
        
        // Log detallado si hay error
        if (response.status >= 400) {
            console.log(`    ${colors.dim}Error: ${JSON.stringify(response.data?.error || response.data)}${colors.reset}`);
        }
        
        return {
            endpoint,
            level,
            status: response.status,
            success: response.status >= 200 && response.status < 300,
            data: response.data
        };
        
    } catch (error) {
        printResult(endpoint, 0, level);
        console.log(`    ${colors.red}Error: ${error.message}${colors.reset}`);
        return {
            endpoint,
            level,
            status: 0,
            success: false,
            error: error.message
        };
    }
}

// ================= TESTS ESPECÍFICOS =================

async function testPublicEndpoints() {
    printSection('🔓 ENDPOINTS PÚBLICOS (Sin autenticación)');
    
    const publicEndpoints = [
        { endpoint: '/', method: 'GET' },
        { endpoint: '/api/health', method: 'GET' },
        { endpoint: '/api/bot/stats', method: 'GET' },
        { endpoint: '/api/shard/0', method: 'GET' },
        { endpoint: '/api/shard/1', method: 'GET' },
        { endpoint: '/api/shards', method: 'GET' }
    ];
    
    const results = [];
    for (const test of publicEndpoints) {
        const result = await testEndpoint(test.endpoint, { level: 'public' }, test.method);
        results.push(result);
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    return results;
}

async function testAuthenticatedEndpoints() {
    printSection('🔑 ENDPOINTS AUTHENTICATED (BOT_API_KEY)');
    
    const authEndpoints = [
        { endpoint: '/api/commands', method: 'GET' },
        { endpoint: '/api/commands/invites', method: 'GET' }, // Comando específico
        { endpoint: '/api/bot/guilds', method: 'GET' },
        { endpoint: '/api/bot/guilds?page=1&limit=5', method: 'GET' },
        { endpoint: '/api/sharding/info', method: 'GET' },
        { endpoint: '/api/bot/panel', method: 'GET' },
        { endpoint: '/api/bot/panel?detailed=true', method: 'GET' }
    ];
    
    const results = [];
    for (const test of authEndpoints) {
        const result = await testEndpoint(test.endpoint, 
            { level: 'authenticated', key: BOT_API_KEY }, 
            test.method);
        results.push(result);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return results;
}

async function testAdminEndpoints() {
    printSection('⚡ ENDPOINTS ADMIN (BOT_ADMIN_API_KEY)');
    
    const adminEndpoints = [
        { endpoint: '/api/admin/stats', method: 'GET' },
        { endpoint: '/api/admin/cache', method: 'GET' },
        { endpoint: '/api/admin/system', method: 'GET' },
        { endpoint: '/api/admin/users/top', method: 'GET' },
        { endpoint: '/api/admin/users/top?limit=5&period=day', method: 'GET' },
        { 
            endpoint: '/api/admin/cache/clear', 
            method: 'POST',
            body: { pattern: 'test_*', scope: 'commands' }
        },
        {
            endpoint: '/api/admin/broadcast',
            method: 'POST',
            body: { action: 'ping', data: { message: 'test' } }
        }
    ];
    
    const results = [];
    for (const test of adminEndpoints) {
        const result = await testEndpoint(test.endpoint,
            { level: 'admin', key: BOT_ADMIN_API_KEY },
            test.method,
            test.body);
        results.push(result);
        await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    return results;
}

async function testAuthBoundaries() {
    printSection('🔐 TEST DE LÍMITES DE AUTENTICACIÓN');
    
    const boundaryTests = [
        {
            name: 'Público con auth (debería funcionar igual)',
            endpoint: '/api/shards',
            authLevels: ['public', 'authenticated', 'admin'],
            expected: 200
        },
        {
            name: 'Authenticated sin clave (debería fallar)',
            endpoint: '/api/commands',
            authLevels: ['public'],
            expected: 401
        },
        {
            name: 'Admin sin clave (debería fallar)',
            endpoint: '/api/admin/stats',
            authLevels: ['public'],
            expected: 401
        },
        {
            name: 'Admin con clave authenticated (debería fallar)',
            endpoint: '/api/admin/stats',
            authLevels: ['authenticated'],
            expected: 403
        }
    ];
    
    for (const test of boundaryTests) {
        console.log(`\n${colors.white}${test.name}:${colors.reset}`);
        
        for (const level of test.authLevels) {
            let key = null;
            if (level === 'authenticated') key = BOT_API_KEY;
            if (level === 'admin') key = BOT_ADMIN_API_KEY;
            
            const result = await testEndpoint(test.endpoint, { level, key }, 'GET');
            
            if (test.expected === 200 && result.status === 200) {
                console.log(`  ${colors.green}✓ ${level}: Funciona correctamente${colors.reset}`);
            } else if (test.expected === 401 && result.status === 401) {
                console.log(`  ${colors.green}✓ ${level}: Correctamente bloqueado (401)${colors.reset}`);
            } else if (test.expected === 403 && result.status === 403) {
                console.log(`  ${colors.green}✓ ${level}: Correctamente prohibido (403)${colors.reset}`);
            } else {
                console.log(`  ${colors.red}✗ ${level}: Error esperado ${test.expected}, recibido ${result.status}${colors.reset}`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

async function testShardSpecific() {
    printSection('🎯 TEST ESPECÍFICO DE SHARDS');
    
    // Primero obtener lista de shards
    const shardsRes = await testEndpoint('/api/shards', { level: 'public' }, 'GET');
    
    if (shardsRes.success && shardsRes.data && shardsRes.data.shards) {
        console.log(`\n${colors.cyan}Shards encontrados: ${shardsRes.data.shards.length}${colors.reset}`);
        
        // Probar cada shard individualmente
        for (let i = 0; i < shardsRes.data.shards.length; i++) {
            const shard = shardsRes.data.shards[i];
            console.log(`\n${colors.white}Shard ${shard.id}: ${shard.status}${colors.reset}`);
            
            // Info detallada del shard
            const shardRes = await testEndpoint(`/api/shard/${shard.id}`, { level: 'public' }, 'GET');
            
            if (shardRes.success) {
                const stats = shardRes.data?.shard?.stats;
                if (stats) {
                    console.log(`  ${colors.dim}Guilds: ${stats.guilds} | Users: ${stats.users} | Ping: ${stats.ping}${colors.reset}`);
                }
            }
            
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }
}

async function testDataConsistency() {
    printSection('📊 TEST DE CONSISTENCIA DE DATOS');
    
    const tests = [
        {
            name: 'Stats públicos vs authenticated',
            publicEndpoint: '/api/bot/stats',
            authEndpoint: '/api/bot/panel',
            compare: (publicData, authData) => {
                const sameGuilds = publicData.guilds === authData.botStatus?.guilds;
                const sameUsers = publicData.users === authData.botStatus?.users;
                return sameGuilds && sameUsers;
            }
        },
        {
            name: 'Shards vs Shard específico',
            listEndpoint: '/api/shards',
            detailEndpoint: '/api/shard/0',
            compare: (listData, detailData) => {
                const shard0InList = listData.shards?.find(s => s.id === 0);
                const detailShard = detailData.shard;
                return shard0InList && detailShard && 
                       shard0InList.guilds === detailShard.stats?.guilds;
            }
        }
    ];
    
    for (const test of tests) {
        console.log(`\n${colors.white}${test.name}:${colors.reset}`);
        
        // Obtener datos públicos
        const publicRes = await testEndpoint(test.publicEndpoint || test.listEndpoint, 
            { level: 'public' }, 'GET');
        
        // Obtener datos authenticated/admin si es necesario
        const authRes = test.authEndpoint || test.detailEndpoint ? 
            await testEndpoint(test.authEndpoint || test.detailEndpoint,
                test.authEndpoint ? { level: 'authenticated', key: BOT_API_KEY } : { level: 'public' },
                'GET') : null;
        
        if (publicRes.success && (!authRes || authRes.success)) {
            const isConsistent = test.compare(publicRes.data, authRes?.data || publicRes.data);
            
            if (isConsistent) {
                console.log(`  ${colors.green}✓ Datos consistentes${colors.reset}`);
            } else {
                console.log(`  ${colors.red}✗ Inconsistencia en los datos${colors.reset}`);
                console.log(`    ${colors.dim}Public: ${JSON.stringify(publicRes.data)}${colors.reset}`);
                if (authRes) {
                    console.log(`    ${colors.dim}Auth: ${JSON.stringify(authRes.data)}${colors.reset}`);
                }
            }
        } else {
            console.log(`  ${colors.yellow}⚠ No se pudo verificar consistencia${colors.reset}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

async function testRateLimiting() {
    printSection('⏱ TEST DE RATE LIMITING');
    
    console.log(`${colors.yellow}Enviando 5 requests rápidos a endpoint público...${colors.reset}`);
    
    const requests = [];
    for (let i = 0; i < 5; i++) {
        requests.push(
            testEndpoint('/api/health', { level: 'public' }, 'GET')
                .then(res => ({ success: res.success, status: res.status }))
        );
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms entre requests
    }
    
    const results = await Promise.all(requests);
    const successCount = results.filter(r => r.success).length;
    const rateLimited = results.filter(r => r.status === 429).length;
    
    console.log(`\n${colors.white}Resultados:${colors.reset}`);
    console.log(`  Requests exitosos: ${colors.green}${successCount}/5${colors.reset}`);
    console.log(`  Rate limited: ${rateLimited > 0 ? colors.red : colors.green}${rateLimited}${colors.reset}`);
    
    if (rateLimited > 0) {
        console.log(`  ${colors.yellow}¡Rate limiting funcionando!${colors.reset}`);
    }
}

// ================= TEST COMPLETO =================

async function runCompleteTest() {
    console.log(`${colors.bright}${colors.cyan}
    ╔══════════════════════════════════════════════════════════════╗
    ║                 TEST COMPLETO API V2 (3 NIVELES)            ║
    ║                    Nyxara Bot - ${new Date().toLocaleDateString()}                ║
    ╚══════════════════════════════════════════════════════════════╝
    ${colors.reset}`);
    
    console.log(`${colors.dim}Configuración:${colors.reset}`);
    console.log(`  URL: ${colors.blue}${BOT_API_URL}${colors.reset}`);
    console.log(`  BOT_API_KEY: ${colors.magenta}${BOT_API_KEY.substring(0, 10)}...${colors.reset}`);
    console.log(`  BOT_ADMIN_API_KEY: ${colors.magenta}${BOT_ADMIN_API_KEY.substring(0, 10)}...${colors.reset}`);
    console.log(`  Hora: ${new Date().toISOString()}\n`);
    
    try {
        // 1. Test de conexión básica
        printSection('🔌 TEST DE CONEXIÓN BÁSICA');
        const healthCheck = await testEndpoint('/api/health', { level: 'public' }, 'GET');
        
        if (!healthCheck.success) {
            console.log(`${colors.red}❌ No se puede conectar a la API. Verifica:${colors.reset}`);
            console.log(`  1. El bot está ejecutándose`);
            console.log(`  2. Puerto 3001 está abierto`);
            console.log(`  3. Firewall permite conexiones`);
            process.exit(1);
        }
        
        console.log(`${colors.green}✅ Conexión establecida${colors.reset}\n`);
        
        // Ejecutar todos los tests
        const publicResults = await testPublicEndpoints();
        const authResults = await testAuthenticatedEndpoints();
        const adminResults = await testAdminEndpoints();
        await testAuthBoundaries();
        await testShardSpecific();
        await testDataConsistency();
        await testRateLimiting();
        
        // Generar reporte final
        printSection('📈 REPORTE FINAL');
        
        const allResults = [...publicResults, ...authResults, ...adminResults];
        const byLevel = {
            public: allResults.filter(r => r.level === 'public'),
            authenticated: allResults.filter(r => r.level === 'authenticated'),
            admin: allResults.filter(r => r.level === 'admin')
        };
        
        console.log(`${colors.white}Resumen por nivel:${colors.reset}`);
        
        Object.entries(byLevel).forEach(([level, results]) => {
            const total = results.length;
            const success = results.filter(r => r.success).length;
            const percent = total > 0 ? Math.round((success / total) * 100) : 0;
            const color = percent === 100 ? colors.green : percent >= 80 ? colors.yellow : colors.red;
            
            console.log(`  ${colors.bright}${level.toUpperCase()}${colors.reset}: ${color}${success}/${total} (${percent}%)${colors.reset}`);
        });
        
        // Problemas comunes
        console.log(`\n${colors.white}Diagnóstico:${colors.reset}`);
        
        const authFailures = byLevel.authenticated.filter(r => !r.success);
        const adminFailures = byLevel.admin.filter(r => !r.success);
        
        if (authFailures.length > 0) {
            console.log(`${colors.yellow}⚠ Problemas con endpoints authenticated:${colors.reset}`);
            authFailures.forEach(f => {
                console.log(`  ${colors.dim}${f.endpoint}: Status ${f.status}${colors.reset}`);
            });
            console.log(`  ${colors.dim}Posible causa: BOT_API_KEY incorrecta o no configurada${colors.reset}`);
        }
        
        if (adminFailures.length > 0) {
            console.log(`${colors.yellow}⚠ Problemas con endpoints admin:${colors.reset}`);
            adminFailures.forEach(f => {
                console.log(`  ${colors.dim}${f.endpoint}: Status ${f.status}${colors.reset}`);
            });
            console.log(`  ${colors.dim}Posible causa: BOT_ADMIN_API_KEY incorrecta${colors.reset}`);
            console.log(`  ${colors.dim}Configúrala en .env: BOT_ADMIN_API_KEY=tu_clave_super_secreta${colors.reset}`);
        }
        
        // Recomendaciones
        console.log(`\n${colors.white}Recomendaciones:${colors.reset}`);
        
        if (byLevel.public.length === 0) {
            console.log(`  ${colors.red}❌ No hay endpoints públicos accesibles${colors.reset}`);
            console.log(`  ${colors.dim}Verifica que la API se esté iniciando en shard 0${colors.reset}`);
        }
        
        if (byLevel.authenticated.length > 0 && authFailures.length === byLevel.authenticated.length) {
            console.log(`  ${colors.red}❌ Todas las autenticaciones fallaron${colors.reset}`);
            console.log(`  ${colors.dim}Verifica BOT_API_KEY en el .env del bot${colors.reset}`);
        }
        
        if (byLevel.admin.length > 0 && adminFailures.length === byLevel.admin.length) {
            console.log(`  ${colors.red}❌ Todas las autenticaciones admin fallaron${colors.reset}`);
            console.log(`  ${colors.dim}Configura BOT_ADMIN_API_KEY en el .env del bot${colors.reset}`);
            console.log(`  ${colors.dim}Ejemplo: BOT_ADMIN_API_KEY=admin_super_secret_key_123${colors.reset}`);
        }
        
        if (allResults.filter(r => r.success).length / allResults.length >= 0.8) {
            console.log(`\n${colors.green}🎉 ¡API funcionando correctamente en su mayoría!${colors.reset}`);
        } else {
            console.log(`\n${colors.red}⚠️  Hay problemas significativos en la API${colors.reset}`);
        }
        
    } catch (error) {
        console.log(`${colors.red}💥 Error durante el test: ${error.message}${colors.reset}`);
        console.log(`${colors.dim}Stack: ${error.stack}${colors.reset}`);
    }
}

// ================= MODO RÁPIDO =================

async function quickTest() {
    console.log(`${colors.cyan}⚡ MODO RÁPIDO - DIAGNÓSTICO BÁSICO${colors.reset}\n`);
    
    const criticalEndpoints = [
        { endpoint: '/api/health', level: 'public', key: null },
        { endpoint: '/api/shards', level: 'public', key: null },
        { endpoint: '/api/commands', level: 'authenticated', key: BOT_API_KEY },
        { endpoint: '/api/admin/stats', level: 'admin', key: BOT_ADMIN_API_KEY }
    ];
    
    const results = [];
    
    for (const test of criticalEndpoints) {
        console.log(`${colors.white}${test.endpoint} [${test.level}]:${colors.reset}`);
        
        const result = await testEndpoint(test.endpoint, 
            { level: test.level, key: test.key }, 
            'GET');
        
        results.push(result);
        
        if (result.success) {
            console.log(`  ${colors.green}✅ OK${colors.reset}\n`);
        } else {
            console.log(`  ${colors.red}❌ FALLÓ${colors.reset}\n`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Análisis rápido
    console.log(`${colors.cyan}📋 ANÁLISIS RÁPIDO:${colors.reset}`);
    
    const publicOk = results.slice(0, 2).every(r => r.success);
    const authOk = results[2]?.success;
    const adminOk = results[3]?.success;
    
    if (!publicOk) {
        console.log(`${colors.red}❌ API no accesible públicamente${colors.reset}`);
        console.log(`${colors.dim}  Verifica: Puerto 3001, firewall, ejecución del bot${colors.reset}`);
    } else if (!authOk) {
        console.log(`${colors.yellow}⚠️  Problema con autenticación authenticated${colors.reset}`);
        console.log(`${colors.dim}  Verifica: BOT_API_KEY en .env del bot${colors.reset}`);
    } else if (!adminOk) {
        console.log(`${colors.yellow}⚠️  Problema con autenticación admin${colors.reset}`);
        console.log(`${colors.dim}  Configura: BOT_ADMIN_API_KEY en .env del bot${colors.reset}`);
    } else {
        console.log(`${colors.green}✅ ¡Todo funcionando correctamente!${colors.reset}`);
        console.log(`${colors.dim}  Todos los niveles de autenticación operativos${colors.reset}`);
    }
}

// ================= EJECUCIÓN =================

async function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--quick') || args.includes('-q')) {
        await quickTest();
    } else if (args.includes('--help') || args.includes('-h')) {
        console.log(`${colors.cyan}
Uso: node test-api-v2-completo.js [opciones]

Opciones:
  --quick, -q     Test rápido de diagnóstico
  --help, -h      Muestra esta ayuda
  (sin opciones)  Test completo de todos los endpoints

Configuración: Edita las constantes al inicio del archivo
  BOT_API_URL     URL de tu API (ej: http://localhost:3001)
  BOT_API_KEY     Clave para endpoints authenticated
  BOT_ADMIN_API_KEY Clave para endpoints admin
        ${colors.reset}`);
    } else {
        await runCompleteTest();
    }
}

// Manejo de errores
process.on('unhandledRejection', (error) => {
    console.error(`${colors.red}❌ Error no manejado: ${error.message}${colors.reset}`);
    process.exit(1);
});

// Ejecutar
main().catch(error => {
    console.error(`${colors.red}💥 Error fatal: ${error.message}${colors.reset}`);
    process.exit(1);
});