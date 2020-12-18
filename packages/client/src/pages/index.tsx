import React from "react";
import Typography from "@material-ui/core/Typography";
import { useGetAllUsersQuery } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { getUrqlClient } from "../constants/urqlClient";

const Home = () => {
    const [status] = useGetAllUsersQuery();
    console.log(status);
    return (
        <div>
            <Typography variant="h1">Hello</Typography>
        </div>
    );
};

export default withUrqlClient(getUrqlClient, {
    ssr: true,
})(Home);
