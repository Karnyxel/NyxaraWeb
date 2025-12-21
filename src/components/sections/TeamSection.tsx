import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react"; // Icono relevante para equipo

interface TeamMember {
  name: string;
  role: string;
  description: string;
  avatar: string; // URL de imagen o path
}

const teamMembers: TeamMember[] = [
  {
    name: "Karnyxel",
    role: "Desarrollador Principal",
    description: "Creador del bot Nyxara y experto en Discord.js.",
    avatar: "/avatars/karnyxel.png", 
    discordTag: "karnyxel",
    links: {
        github: "https://github.com/luna_design",
        twitter: "https://twitter.com/luna_design"
      }
},
  // Agrega más miembros del equipo aquí, ej:
  {
    name: "Colaborador X",
    role: "Diseñador",
    description: "Encargado de UI/UX y estilos.",
    avatar: "/avatars/colaborador.png",
    discordTag: "codex_dev",
    links: {
        youtube: "youtube.com/colabx",
        github: "github.com/colabx"
    }
  },
  // Etc.
];

export function TeamSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Nuestro Equipo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conoce al equipo detrás de Nyxara, el bot que revoluciona tus servidores de Discord.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="glass-effect card-hover overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6 text-center">
                <CardTitle className="text-2xl font-semibold mb-2">
                  {member.name}
                </CardTitle>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}