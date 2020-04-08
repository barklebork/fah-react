const API = "https://cors-anywhere.herokuapp.com/https://stats.foldingathome.org/api/";

export default function fetcher(endpoint, params, content, method = "GET") {
  const url = new URL(`${API}${endpoint}`);
  //Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
  url.search = new URLSearchParams(params);

  return fetch(url, {
    method: method,
    mode: 'cors',
    body: JSON.stringify(content)
  }).then(res => res.json());
}

export function getDonors(monthly = false, name = "", search = "", passkey = "", team = "") {
  return fetcher(monthly ? "donors-monthly" : "donors", {
    name: name,
    search: search,
    passkey: passkey,
    team: team
  });
}

export function getDonor(id) {
  return fetcher(`donor/${id}`);
}

export function getTeams(monthly = false, name = "", search = "", passkey = "", team = "") {
  return fetcher(monthly ? "teams-monthly" : "teams", {
    name: name,
    search: search,
    passkey: passkey,
    team: team
  });
}

export function getTeam(id) {
  return fetcher(`team/${id}`);
}

export function getOSStats() {
  return fetcher("os");
}
