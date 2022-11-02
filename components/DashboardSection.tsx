import { H1 } from "components/utils/atoms";
import { ReactNode } from "react";

interface DashboardSectionProps {
    title: String;
    children: ReactNode;
}

const DashboardSection = ({ title, children }: DashboardSectionProps) => {
    return (
        <section tw="mt-6">
            <H1>{title}</H1>
            <div tw="mt-4">{children}</div>
        </section>
    );
};

export default DashboardSection;
