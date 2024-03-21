import {fetchCustomers} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/create-form";

//TODO:; finish the saving part in chapter 12.
const Page = async () => {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                { label: 'Invoices', href: '/dashboard/invoices' },
                {
                    label: 'Create Invoice',
                    href: '/dashboard/invoices/create',
                    active: true,
                },
            ]} />
            <Form customers={customers} />
        </main>
    )
};

export default Page;