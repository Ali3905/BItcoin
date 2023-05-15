import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";


export async function getServerSideProps(context) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const json = await response.json();

  return {
    props: {users:json}, // will be passed to the page component as props
  }
}
const Nested = ({ users }) => {
  return (
    <>
      <List>
        {users &&
          users.map((user) => {
            return (
              <Link legacyBehavior href={`nested/${user.id}`} key={user.id}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={user.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
      </List>
    </>
  );
};

export default Nested;
