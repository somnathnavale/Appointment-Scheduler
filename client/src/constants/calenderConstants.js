import { Views } from "react-big-calendar";

export const defaultContextMenu = {
  xPosition: null,
  yPosition: null,
  selectedTime: null,
  resourceId: null,
};

export const ViewsEnum = [
  {
    name: "Month",
    value: Views.MONTH,
  },
  {
    name: "Week",
    value: Views.WEEK,
  },
  {
    name: "Day",
    value: Views.DAY,
  },
];
