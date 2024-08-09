"use client";

import { Button } from "../../components/Button";

export default function ViewResultsButton({
  showResults,
}: {
  showResults: boolean;
}) {
  function handleResultsButtonClick() {
    if (!showResults) {
      window.location.href = window.location.href + "?results=true";
    }
  }
  return (
    <Button customClasses={["mb-8"]} onClick={handleResultsButtonClick}>
      View Results
    </Button>
  );
}
