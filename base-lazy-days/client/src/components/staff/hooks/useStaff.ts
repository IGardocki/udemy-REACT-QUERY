import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { S } from "vitest/dist/reporters-O4LBziQ_";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

export function useStaff() {
  const fallback: Staff[] = [];

  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");

  // get data from server via useQuery
  const {data: staff = fallback} = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
  });

  return { staff, filter, setFilter };
}
