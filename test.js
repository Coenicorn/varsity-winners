// very bad code to quickly parse data found online so I can lift some of the workload lmao

const strings = [
  "2 jul 1878 Leiden 3200 Laga 14:42 12 sec",
  "13 jun 1880 Leiden 3200 Laga 15:14 15 sec",
  "9 okt 1881 Delft 3400 Laga -- 12 sec",
  "9 okt 1882 Leiden 3600 Njord 15:22 37 sec",
  "30 jun 1883 Oudshoorn 3400 Njord -- --",
  "5 okt 1884 Oudshoorn 3400 Njord 14:07 04 sec",
  "31 mei 1885 Haarlem 3400 Njord 15:24 18 sec",
  "30 mei 1886 Haarlem 3400 Njord 14:36 08 sec",
  "22 mei 1887 Haarlem 3400 Njord 14:00 09 sec",
  "27 mei 1888 Haarlem 3400 Laga 12:54,6 12 sec",
  "26 mei 1889 Haarlem 3400 Njord 13:49 15 sec",
  "1 jun 1890 Haarlem 3300 Laga 14:00 14,5 sec",
  "31 mei 1891 Haarlem 3000 Nereus 12:43 3 sec",
  "29 mei 1892 Haarlem 3000 Nereus 13:28 ?",
  "4 jun 1893 Haarlem 3000 Nereus 11:08 2 lengten",
  "27 mei 1894 Haarlem 3000 Nereus 11:39 1/2 lengte",
  "28 mei 1895 Haarlem 3000 Triton 10:55 10 lengten",
  "31 mei 1896 Haarlem 3000 Triton 10:51,4 4 lengten",
  "7 jun 1897 Haarlem 3000 Triton 10:52,2 8,75 sec",
  "30 mei 1898 Haarlem 3000 Triton 11:15,6 2 lengten",
  "26 mei 1899 Haarlem 3000 Nereus 11:29 9 sec",
  "27 mei 1900 Haarlem 3000 Njord 10:25 1/3 lengte",
  "2 jun 1901 Haarlem 3000 Laga 12:40 5 lengten",
  "4 jun 1902 De Zweth 3000 Laga 11:02,5 1",
  "24 mei 1903 De Zweth 3000 Laga 11:00 1/2",
  "5 jun 1904 De Zweth 3000 Nereus 11:20 gemakkelijk",
  "28 mei 1905 De Zweth 3000 Nereus 11:56 ?",
  "24 mei 1906 De Zweth 3000 Njord 12:16 16",
  "20 mei 1907 De Zweth 3000 Laga 12:18 1",
  "28 mei 1908 De Zweth 3000 Njord 12:05 4",
  "20 mei 1909 De Zweth 3000 Nereus 11:37,5 ?",
  "16 mei 1910 De Zweth 3000 Nereus 12:21 14,8",
  "25 mei 1911 De Zweth 3000 Triton 12:32 5",
  "16 mei 1912 De Zweth 3000 Triton 11:40 gemakkelijk",
  "12 mei 1913 De Zweth 3000 Laga 12:05,6 5",
  "21 mei 1914 De Zweth 3000 Laga 11:31 4",
  "13 mei 1915 Nrdzeekan. 2000 Laga 9:45 2 lengten",
  "1 jun 1916 Nrdzeekan. 3000 Nereus 11:54,8 taftlengte",
  "17 mei 1917 Nrdzeekan. 3000 Laga 14:39 2 1/2",
  "20 mei 1918 Nrdzeekan. 3000 Aegir 13:25 6 lengten",
  "25 mei 1919 Nrdzeekan. 3000 Nereus 11:40 1 1/4",
  "13 mei 1920 Nrdzeekan. 3000 Laga 11:22 1 1/2",
  "5 mei 1921 Nrdzeekan. 3000 Nereus 11:51,8 1/2 lengte",
  "25 mei 1922 Nrdzeekan. 3000 Laga 11:37,6 1 3/4",
  "10 mei 1923 Nrdzeekan. 3000 Laga 10:54,6 2 lengten",
  "11 mei 1924 Nrdzeekan. 3000 Nereus 10:45,6 1/2 lengte",
  "21 mei 1925 Nrdzeekan. 3000 Laga 10:44,8 ?",
  "13 mei 1926 Nrdzeekan. 3000 Laga 11:10,8 1/2 lengte",
  "28 mei 1927 Nrdzeekan. 3000 Laga 11:03 1 meter",
  "17 mei 1928 Nrdzeekan. 3000 Nereus 11:06 taftlengte",
  "9 mei 1929 Nrdzeekan. 3000 Njord 11:11 3/4 lengte",
  "11 mei 1930 Nrdzeekan. 3000 Triton 11:21 1 meter",
  "14 mei 1931 Nrdzeekan. 3000 Nereus 11:04,2 2 lengten",
  "5 mei 1932 Nrdzeekan. 3000 Nereus 10:36 1 1/2",
  "25 mei 1933 Nrdzeekan. 3000 Triton 10:49,6 2 lengten",
  "10 mei 1934 Nrdzeekan. 3000 Nereus 12:13 3/4 lengte",
  "30 mei 1935 Nrdzeekan. 3000 Nereus 11:13,2 1 1/3",
  "21 mei 1936 Nrdzeekan. 3000 Triton 12:21 2 lengten",
  "6 mei 1937 Bosbaan 2000 Triton 6:57 3/4 lengte",
  "15 mei 1938 Bosbaan 2000 Laga 7:10,5 3/4 lengte",
  "18 mei 1939 Bosbaan 2000 Laga 7:23,8 2 1/2",
  "5 mei 1940 Juthphaas 3000 Laga 11:05 10 cm",
  "5 mei 1946 Juthphaas 3000 Triton 11:12 4 lengten",
  "1 mei 1947 Juthphaas 3000 Triton 10:47,4 3/4 lengte",
  "2 mei 1948 Juthphaas 3000 Triton 10:53,4 3/4 lengte",
  "1 mei 1949 Juthphaas 3000 Njord 10:48,4 6 lengten",
  "7 mei 1950 Juthphaas 3000 Njord 10:43,6 0,2 sec",
  "6 mei 1951 Juthphaas 3000 Njord 10:43,6 1/4 lengte",
  "27 apr 1952 Juthphaas 3000 Nereus 10:54 2 1/2",
  "3 mei 1953 Juthphaas 3000 Nereus 10:45 2 1/2",
  "2 mei 1954 Juthphaas 3000 Njord 11:49,8 1 lengte",
  "1 mei 1955 Juthphaas 3000 Laga 11:08,2 3,8 sec",
  "6 mei 1956 Juthphaas 3000 Aegir 10:36,8 0,5 sec",
  "5 mei 1957 Juthphaas 3000 Laga 11:42,5 1 1/2",
  "27 apr 1958 Juthphaas 3000 Nereus 10:59,8 2 1/2",
  "3 mei 1959 Juthphaas 3000 Nereus 11:10,8 2 lengten",
  "1 mei 1960 Juthphaas 3000 Ar/Njo 10:35,6 2 lengten",
  "16 mei 1961 Juthphaas 3000 Argo 10:32,6 4 lengten",
  "6 mei 1962 Juthphaas 3000 Nereus 10:58,5 1/2 lengte",
  "6 mei 1963 Juthphaas 3000 Njord 10:42,8 0,5 sec",
  "24 mei 1964 Juthphaas 3000 Triton 11:17,2 0,6 sec",
  "2 mei 1965 Juthphaas 3000 Nereus 10:28,8 5,3 sec",
  "1 mei 1966 Juthphaas 3000 Nereus 11:16,8 20,8 sec",
  "7 mei 1967 Juthphaas 3000 Triton 11:18 18 sec",
  "5 mei 1968 Juthphaas 3000 Laga 10:40,9 2,1 sec",
  "27 apr 1969 Juthphaas 3000 Nereus 10:32,4 9 sec",
  "3 mei 1970 Houten 3000 Laga 10:55,6 8 sec",
  "2 mei 1971 Bosbaan 2000 Nereus 7:15,0 6 sec",
  "7 mei 1972 Houten 3000 Laga 10:19,5 44 sec",
  "6 mei 1973 Houten 3000 Laga 10:57,0 0,8 sec",
  "5 mei 1974 Houten 3000 Aegir 10:21,6 2,2 sec",
  "27 apr 1975 Houten 3000 Aegir 11:13,8 14,1 sec",
  "2 mei 1976 Houten 3000 Laga 10:07,0 17 sec",
  "1 mei 1977 Houten 3000 Nereus 10:25,0 7,4 sec",
  "16 apr 1978 Houten 3000 Aegir 10:02,0 2,8 sec",
  "27 apr 1979 Houten 3000 Nereus 10:49,2 7,7 sec",
  "26 apr 1980 Houten 3000 Orca 9:59,5 5,8 sec",
  "2 mei 1981 Houten 3000 Skadi 9:50,5 1,12 sec",
  "24 apr 1982 Houten 3000 Aegir 10:13,5 ? ?",
  "15 apr 1983 Houten 3000 Orca 10:46 6 sec",
  "28 apr 1984 Houten 3000 Njord 10:16,4 3,31 sec",
  "28 apr 1985 Houten 2000 Njord 6:41,7 1,35 sec",
  "27 apr 1986 Houten 3000 Njord ? ?",
  "26 apr 1987 Houten 3000 Njord 10:01,3 10,3 sec",
  "24 apr 1988 Houten 3000 Njord 10:28 5 sec",
  "23 apr 1989 Houten 3000 Okeanos 10:17,8 12,8 sec",
  "22 apr 1990 Houten 3000 Laga 10:46,8 4,6 sec",
  "14 apr 1991 Houten 3000 Nereus 9:51,9 2,3 sec",
  "19 apr 1992 Houten 3000 Skadi 9:28,0 1 sec",
  "18 apr 1993 Houten 3000 Nereus 10:02,0 5,04 sec",
  "17 apr 1994 Houten 3000 Nereus 10:07,5 10,2 sec",
  "23 apr 1995 Houten 3000 Euros 9:55,1 2,8 sec",
  "14 apr 1996 Houten 3000 Nereus 10:22,8 11 sec",
  "13 apr 1997 Houten 3000 Laga 9:40,5 4,4 sec",
  "19 apr 1998 Houten 3000 Nereus 9:58,9 8,1 sec",
  "18 apr 1999 Houten 3000 Orca 9:31,2 1,8 sec",
  "16 apr 2000 Houten 3000 Orca 10:19,0 6,8 sec",
  "8 apr 2001 Houten 3000 Skadi 9:58,6 7,1 sec",
  "7 apr 2002 Houten 3000 Nereus 10:09,0 8,2 sec",
  "13 apr 2003 Houten 3000 Nereus 10:56,2 5,5 sec",
  "11 apr 2004 Houten 3000 Orca 10:00,8 4,9 sec",
  "10 apr 2005 Houten 3000 Nereus 9:59,9 1,4 sec",
  "9 apr 2006 Houten 3000 Skadi 9:39,7 5,2 sec",
  "15 apr 2007 Houten 3000 Skadi 10:08,7 5,2 sec",
];

function monthToInt(month) {
  switch (month) {
    case "apr":
      return "04";
    case "mei":
      return "05";
    case "okt":
      return "10";
    case "jun":
      return "06";
    case "jul":
      return "07";
    default:
      return "###########";
  }
}

function consistentTime(time) {
  if (time === "?" || time.indexOf("-") !== -1) return "00:00,00";
  let out = "";
  let p = time.split(":");
  if (p[0].length == 2) out += p[0];
  else out += `0${p[0]}`;
  out += ":";

  let commap = p[1].split(",");

  if (commap[0].length == 2) out += commap[0];
  else out += `0${commap[0]}`;

  if (commap.length == 1) out += ",00";
  else out += `,${commap[1]}0`;

  return out;
}

function consistentSec(sec) {
  let out = "";
  let p = sec.split(",");
  if (p[0].length == 1) out += "0" + p[0];
  else out += p[0];
  out += ",";
  if (p[1].length == 1) out += p[1] + "0";
  else out += p[1];
  return out;
}

function consistentMargin(margin) {
  if (margin.indexOf("?") > -1) return "00,00";
  let out = "";
  if (margin.indexOf("sec") > -1) {
    let sec = margin.split(" ")[0];

    // consistent seconds
    if (sec.indexOf(",") == -1) out += consistentSec(`${sec},00`);
    else out += consistentSec(sec);

    return out;
  } else return margin;
}

function morphLocation(location) {
  switch (location) {
    case "Houten":
      return "Amsterdam-Rijnkanaal (Houten)";
    case "Juthphaas":
      return "Amsterdam-Rijnkanaal (Jutphaas)";
    case "Bosbaan":
      return "Boschbaan";
    case "Nrdzeekan.":
      return "Noordzeekanaal";
    case "Haarlem":
      return "Noorder-Buitenspaarne";
    case "Oudshoorn":
      return "Oude Rijn";
    case "Leiden":
      return "Galgewater";
    case "Delft":
      return "De Schie";
    case "De Zweth":
      return "De Schie";
  }
}

let arr = [];

for (let i = strings.length - 1; i >= 0; i--) {
  let str = strings[i];

  let parts = str.split(" ");
  // console.log(parts);

  let date = `${parts[0].length == 2 ? parts[0] : `0${parts[0]}`}-${monthToInt(
    parts[1]
  )}-${parts[2]}`;
  // console.log(date);

  let zwethFlag = parts[3] == "De";
  let location = zwethFlag ? parts[3] + " " + parts[4] : parts[3];
  location = morphLocation(location);
  // console.log(location);

  let length = zwethFlag ? parts[5] : parts[4];
  // console.log(length);

  let club = zwethFlag ? parts[6] : parts[5];
  // console.log(club);

  let time = zwethFlag ? parts[7] : parts[6];
  time = consistentTime(time);
  // console.log(time);

  let margin = zwethFlag ? parts.slice(8).join(" ") : parts.slice(7).join(" ");
  margin = consistentMargin(margin);
  // console.log(margin);

  let obj = {
    date: date,
    location: location,
    club: club,
    time: time,
    alt_margin: margin.indexOf(",") < 0 ? margin : "",
    margin: margin.indexOf(",") < 0 ? "00,00" : margin,
    crew: [
      {
        name: "",
      },
      {
        name: "",
      },
      {
        name: "",
      },
      {
        name: "",
      },
      {
        name: "",
      },
    ],
    notes: "",
    sources: [25, 28],
  };

  arr.push(obj);
}

console.log(JSON.stringify(arr));