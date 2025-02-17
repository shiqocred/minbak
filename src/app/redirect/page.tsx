import { redirect } from "next/navigation";
import React from "react";

const RedirectPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { resultCode } = await props.searchParams;

  if (resultCode === "00") {
    redirect("/?page=result&status=00");
  } else if (resultCode === "01") {
    redirect("/?page=result&status=01");
  } else {
    redirect("/?page=result&status=02");
  }
  return <div>RedirectPage</div>;
};

export default RedirectPage;
