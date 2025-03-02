"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/types/appwrite.types";

// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string

// }

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },

  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      //const appointment = row.original

      return <p className="text-14-medium">{row.original.patient.name}</p>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },
  // {
  //   accessorKey: "schedule",
  //   header: "Appointment",
  //   cell: ({ row }) => {
  //     <p className="text-14-regular min-w-[100px]">
  //       {formatDateTime(row.original.schedule).dateTime}
  //     </p>;
  //   },
  // },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(row.original.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: () => "Doctor",
    cell: ({ row }) => {
      const doctors = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician,
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctors?.image}
            width={100}
            height={100}
            alt={doctors?.name}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctors?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            // title='Schedule Appointment'
            // description = 'Please confirm the following details to schedule an appointment'
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            // title='Cancel Appointment'
            // description = "Are you sure you want to cancel this appointment?"
          />
        </div>
      );
    },
  },
];
