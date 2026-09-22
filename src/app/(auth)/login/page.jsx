import FromLogin from "@/components/organism/FromLogin";
import { headers } from "next/headers";

export const metadata = {
  title: "Iniciar Sesión",
  description: "Inicia sesión para acceder a la plataforma",
};

async function getSchoolName(subdomain) {
  if (!subdomain) return null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/check/${subdomain}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.school_name;
  } catch (error) {
    return null;
  }
}

export default async function LoginPage() {
  const headerList = await headers();
  const subdomain = headerList.get("x-school-subdomain");
  const schoolName = await getSchoolName(subdomain);

  return <FromLogin schoolName={schoolName} />;
}
