import { useRouter } from "next/router";

const useRefresh = () => {
    const router = useRouter();
    return () => router.replace(router.asPath);
};

export default useRefresh;
