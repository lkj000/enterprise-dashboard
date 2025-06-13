export const getQueueData = (data) => {
    return data.map((item, i) => {
      const { pathname } = new URL(item);
      const parts = pathname.split("/");
      return { sNo: i+1, name: `${parts[1]}/${parts[2]}`, queue: parts[5] };
    });
  };