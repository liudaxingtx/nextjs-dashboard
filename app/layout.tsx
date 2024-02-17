import '@/app/ui/global.css';
import {primaryText} from "@/app/ui/fonts";

const RootLayout = ({children}: { children: React.ReactNode; }) => (
    <html lang="en">
        <body className={`${primaryText.className} antialiased`}>
            {children}
        </body>
    </html>
);

export default RootLayout;