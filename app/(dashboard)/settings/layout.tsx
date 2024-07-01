import SettingsContainer from "@/components/settings/settings-container";
import SettingsTab from "@/components/settings/settings-tab";

export default function DashboardLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="flex space-x-5">
         <SettingsTab />
         <SettingsContainer>
            {children}
         </SettingsContainer>
      </div>
   )
}