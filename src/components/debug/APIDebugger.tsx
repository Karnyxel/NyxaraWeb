// Crea un archivo src/components/debug/APIDebugger.tsx
'use client';

import { useEffect, useState } from 'react';
import { botAPI } from '@/lib/api/bot-client';

export default function APIDebugger() {
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testAPI = async () => {
      try {
        setLoading(true);
        console.log('🔍 Probando conexión a API del bot...');
        
        // Test 1: Health endpoint
        console.log('🩺 Probando /api/health...');
        const health = await botAPI.getHealth();
        console.log('Health response:', health);
        
        // Test 2: Commands endpoint
        console.log('🎮 Probando /api/commands...');
        const commands = await botAPI.getCommands();
        console.log('Commands response:', commands);
        
        // Test 3: Direct fetch
        console.log('🌐 Probando fetch directo...');
        const direct = await fetch('http://103.195.101.224:3001/api/health');
        console.log('Direct fetch:', {
          ok: direct.ok,
          status: direct.status,
          headers: Object.fromEntries(direct.headers.entries())
        });
        
        setStatus({
          health,
          commands,
          timestamp: new Date().toISOString()
        });
      } catch (err: any) {
        console.error('❌ Error testing API:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    testAPI();
  }, []);

  if (loading) return <div>Diagnosticando API...</div>;

  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <h3 className="text-lg font-bold mb-2">🔧 Debug de API del Bot</h3>
      
      {error ? (
        <div className="text-red-400">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Health Check:</h4>
            <pre className="text-sm bg-black p-2 rounded overflow-auto">
              {JSON.stringify(status?.health, null, 2)}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold">Commands Response:</h4>
            <pre className="text-sm bg-black p-2 rounded overflow-auto">
              {JSON.stringify(status?.commands, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}