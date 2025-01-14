const formatTime = (date) => {
  var ts = new Date(date);
  return `${ts.toString().substr(16, 5)}`;
};
const formatDate = (date) => {
  if (date) {
    const ts = new Date(date);
    const month = formatMonth(date);
    const now = ts.toDateString().substr(8, 2);
    const year = ts.toDateString().substr(11, 4);
    const newDate = `${now} ${month} ${year}`;
    return newDate;
  } else {
    return date;
  }
};

const formatDay = (date) => {
  var ts = new Date(date);
  let newDay = "";
  if (ts.toDateString().substr(0, 3) === "Mon") {
    newDay = "Senin";
  } else if (ts.toDateString().substr(0, 3) === "Tue") {
    newDay = "Selasa";
  } else if (ts.toDateString().substr(0, 3) === "Wed") {
    newDay = "Rabu";
  } else if (ts.toDateString().substr(0, 3) === "Thu") {
    newDay = "Kamis";
  } else if (ts.toDateString().substr(0, 3) === "Fri") {
    newDay = "Jumat";
  } else if (ts.toDateString().substr(0, 3) === "Sat") {
    newDay = "Sabtu";
  } else if (ts.toDateString().substr(0, 3) === "Sun") {
    newDay = "Minggu";
  }
  return newDay;
};

const formatMonth = (date) => {
  var ts = new Date(date);
  let newMonth = "";
  if (ts.toDateString().substr(4, 3) === "Jan") {
    newMonth = "Januari";
  } else if (ts.toDateString().substr(4, 3) === "Feb") {
    newMonth = "Februari";
  } else if (ts.toDateString().substr(4, 3) === "Mar") {
    newMonth = "Maret";
  } else if (ts.toDateString().substr(4, 3) === "Apr") {
    newMonth = "April";
  } else if (ts.toDateString().substr(4, 3) === "May") {
    newMonth = "Mei";
  } else if (ts.toDateString().substr(4, 3) === "Jun") {
    newMonth = "Juni";
  } else if (ts.toDateString().substr(4, 3) === "Jul") {
    newMonth = "Juli";
  } else if (ts.toDateString().substr(4, 3) === "Aug") {
    newMonth = "Agustus";
  } else if (ts.toDateString().substr(4, 3) === "Sep") {
    newMonth = "September";
  } else if (ts.toDateString().substr(4, 3) === "Oct") {
    newMonth = "Oktober";
  } else if (ts.toDateString().substr(4, 3) === "Nov") {
    newMonth = "November";
  } else if (ts.toDateString().substr(4, 3) === "Dec") {
    newMonth = "Desember";
  }
  return newMonth;
};

const formatFullDate = (date) => {
  const ts = new Date(date);
  const day = formatDay(date);
  const month = formatMonth(date);
  const now = ts.toDateString().substr(8, 2);
  const year = ts.toDateString().substr(11, 4);
  const newDate = `${day}, ${now} ${month} ${year}`;
  return newDate;
};

export const formattingDate = (date) => {
  const formattedDate = new Date(date);
  return `${formatFullDate(formattedDate)}`;
};

export const formattingDateWithHour = (date) => {
  const formattedDate = new Date(date);
  return `${formatFullDate(formattedDate)}${formatTime(formattedDate) !== "00:00" ? ` Pukul ${formatTime(formattedDate)}` : ""} `;
};
