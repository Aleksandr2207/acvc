import { createClient, dedupExchange, fetchExchange, ssrExchange } from "urql";

import { cacheExchange } from "@urql/exchange-graphcache";

const isServerSide = typeof window === "undefined";

const ssr = ssrExchange({
    isClient: !isServerSide,
    initialState: !isServerSide ? (window as any).__URQL_DATA__ : undefined,
});

export const getUrqlClient = () =>
    createClient({
        url: "http://localhost:4000/graphql",
        exchanges: [dedupExchange, cacheExchange({}), ssr, fetchExchange],
    });
