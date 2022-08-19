import _dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
_dayjs.extend(utc);
_dayjs.extend(timezone);
_dayjs.extend(isSameOrBefore);
_dayjs.extend(isSameOrAfter);

export const dayjs = _dayjs;
