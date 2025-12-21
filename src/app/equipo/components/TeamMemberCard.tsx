import { TeamMember } from '../types';
import { Github, Twitter, Linkedin, MessageCircle } from 'lucide-react';

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
      {/* Avatar */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
        <img
          src={member.avatarUrl}
          alt={member.name}
          className="relative w-full h-full rounded-full object-cover border-4 border-gray-800 group-hover:border-purple-500 transition-all duration-300"
        />
      </div>

      {/* Info */}
      <h3 className="text-2xl font-bold text-white text-center mb-2">{member.name}</h3>
      <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
        {member.role}
      </div>
      
      <p className="text-gray-300 text-center mb-6 leading-relaxed">
        {member.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {member.skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-4">
        {member.socialLinks.github && (
          <a
            href={member.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors hover:text-white text-gray-400"
          >
            <Github size={20} />
          </a>
        )}
        {member.socialLinks.twitter && (
          <a
            href={member.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors hover:text-blue-400 text-gray-400"
          >
            <Twitter size={20} />
          </a>
        )}
        {member.socialLinks.linkedin && (
          <a
            href={member.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors hover:text-blue-500 text-gray-400"
          >
            <Linkedin size={20} />
          </a>
        )}
        {member.socialLinks.discord && (
          <a
            href={member.socialLinks.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors hover:text-indigo-400 text-gray-400"
          >
            <MessageCircle size={20} />
          </a>
        )}
      </div>
    </div>
  );
}