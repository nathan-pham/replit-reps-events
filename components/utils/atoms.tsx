import styled from "@emotion/styled";
import tw from "twin.macro";

export const Input = styled.input`
    &[type="password"],
    &[type="text"],
    &[type="email"] {
        ${tw`border border-gray-200 bg-gray-50 rounded-md py-1 px-2 text-sm hover:(border-gray-300) focus:(border-blue-500 outline-none) transition-colors`}
    }
`;

export const Button = styled.button(
    ({ variant = "default" }: { variant?: "default" | "hollow" }) => [
        tw`flex items-center justify-center gap-1 text-center rounded-md px-2 py-1 text-sm transition-colors`,
        variant === "default" &&
            tw`border border-transparent bg-blue-300 hover:(border-blue-500)`,
        variant === "hollow" && tw`border hover:(border-gray-300)`,
    ]
);
