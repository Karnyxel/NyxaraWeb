'use client';

import { DiscordLogo, GithubLogo, TwitterLogo } from '@phosphor-icons/react';

export default function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Karnyxel",
      role: "Desarrollador Principal",
      description: "Creador y mantenedor de Nyxara. Apasionado por los bots de Discord y la automatización.",
      discordTag: "karnyxel",
      avatarColor: "bg-purple-600",
      links: {
        github: "https://github.com/karnyxel",
        twitter: "https://twitter.com/karnyxel",
        discord: "https://discord.gg/nyxara"
      }
    },
    {
      id: 2,
      name: "Luna",
      role: "Diseñadora UI/UX",
      description: "Encargada de la experiencia de usuario y el diseño de interfaces del bot.",
      discordTag: "luna_design",
      avatarColor: "bg-pink-600",
      links: {
        github: "https://github.com/luna_design",
        twitter: "https://twitter.com/luna_design"
      }
    },
    {
      id: 3,
      name: "Nyx",
      role: "Community Manager",
      description: "Gestiona la comunidad, soporte y organización de eventos del bot.",
      discordTag: "nyx_cm",
      avatarColor: "bg-blue-600",
      links: {
        twitter: "https://twitter.com/nyx_cm",
        discord: "https://discord.gg/nyxara"
      }
    },
    {
      id: 4,
      name: "Codex",
      role: "Desarrollador Backend",
      description: "Especialista en bases de datos y optimización del rendimiento del bot.",
      discordTag: "codex_dev",
      avatarColor: "bg-green-600",
      links: {
        github: "https://github.com/codex_dev"
      }
    }
  ];

  const botStats = [
    { number: "24/7", label: "Uptime" },
    { number: "500+", label: "Servidores" },
    { number: "50+", label: "Comandos" },
    { number: "99%", label: "Estabilidad" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Nuestro Equipo
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            El equipo detrás de <span className="text-purple-400 font-semibold">Nyxara</span>, 
            trabajando para ofrecerte el mejor bot de Discord.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300 group"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`${member.avatarColor} w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold`}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-gray-400">@{member.discordTag}</p>
                </div>
              </div>

              {/* Role */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                  {member.role}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6">
                {member.description}
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {member.links.discord && (
                  <a 
                    href={member.links.discord}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DiscordLogo size={20} className="text-[#5865F2]" />
                  </a>
                )}
                {member.links.github && (
                  <a 
                    href={member.links.github}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubLogo size={20} className="text-white" />
                  </a>
                )}
                {member.links.twitter && (
                  <a 
                    href={member.links.twitter}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterLogo size={20} className="text-[#1DA1F2]" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bot Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Estadísticas de Nyxara
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {botStats.map((stat, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            ¿Quieres unirte a nuestro servidor de Discord?
          </h2>
          <p className="text-gray-300 mb-8">
            Conoce más sobre Nyxara, obtén soporte y comparte con la comunidad.
          </p>
          <a
            href="https://discord.gg/nyxara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-lg transition-colors"
          >
            <DiscordLogo size={24} />
            Unirse al Discord
          </a>
        </div>
      </section>
    </div>
  );
}