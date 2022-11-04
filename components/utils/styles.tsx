import styled from "@emotion/styled";
import tw from "twin.macro";

export const ClickableIcon = styled.button`
    ${tw`p-1 rounded-md hover:(bg-gray-100 cursor-pointer) transition-colors`}
`;

export const PopupAnchor = styled.a`
    ${tw`block px-2 py-1 cursor-pointer text-sm hover:(bg-gray-100) transition-colors`}
`;

export const PopupTitle = styled.span`
    ${tw`block px-2 py-1 text-xs text-gray-500 uppercase`}
`;

export const Editable = styled.div`
    ${tw`flex items-center relative`}
`;

export const EditableSet = styled.div`
    ${tw`absolute -left-2 -translate-x-full opacity-0 group-hover:opacity-100 transition-opacity`}
`;
