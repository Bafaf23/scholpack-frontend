import ProfileClient from "@/app/dashboard/profile/ProfileClient";

export const metadata = {
  titel: " Mi Perfil",
  description: "Información del usuario",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
