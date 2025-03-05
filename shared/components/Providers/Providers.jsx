import { MenuProvider } from "@/context/MenuContext";
import { VacanciesProvider } from "@/context/VacanciesContext";
import { TabsProvider } from "@/context/TabsContext";
import { ModalProvider } from "@/context/ModalContext";

export default function Providers({ children }) {
  return (
    <TabsProvider>
      <MenuProvider>
        <ModalProvider>
          <VacanciesProvider>{children}</VacanciesProvider>
        </ModalProvider>
      </MenuProvider>
    </TabsProvider>
  );
}
