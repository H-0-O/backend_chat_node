export function filed(error: string | object) {
  return JSON.stringify({
    status: false,
    error,
  });
}

export function success(data: string | object | null) {
  return JSON.stringify({
    status: true,
    data,
  });
}
