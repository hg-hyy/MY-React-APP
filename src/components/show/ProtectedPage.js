import React from "react";

export default function ProtectedPage(props) {
  const { data } = props;
  return <h3>{data.email}</h3>;
}
