// Inputs fields (Tiles)
const tilesInfo = [
  {  title: "Avg. Coverage", obj: "coverage"  },
  {  title: "Avg. Duplicated Lines Density", obj: "duplicated_lines_density"  },
  {  title: "Avg. Reliability Rating", obj: "reliability_rating"  },
  {  title: "Avg. Security Hotspots Reviewed", obj: "security_hotspots_reviewed"  },
  {  title: "Avg. Security Rating", obj: "security_rating"  },
  {  title: "Avg. Maintainability Rating", obj: "sqale_rating"  },
];

export const getTilesData = (data) => {
  if (data.length === 0) {
    return [];
  } else {
    return tilesInfo.map((item) => {
      const validData = data.filter(info => info[item.obj] != null && info[item.obj] !== '' && info[item.obj] !== '0.0' && typeof info[item.obj] !== 'undefined');
      let avgData = 0;
      if (validData.length !== 0) {
        const totalData = validData.reduce((sum, info) => sum + parseFloat(info[item.obj]), 0);
        avgData = totalData / data.length;
      }
      return { title: item.title, text: avgData.toFixed(1) };
    });
  }
};