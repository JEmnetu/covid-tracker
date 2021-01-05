import { HorizontalBar } from "react-chartjs-2";

const Graph = ({ caseData }) => {
  const data = {
    labels: ["Cases", "Recovered", "Deaths"],
    datasets: [
      {
        label: "# of People",
        data: [caseData.cases, caseData.recovered, caseData.deaths],
        backgroundColor: ["Red", "Blue", "Yellow"],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return <HorizontalBar data={data} options={options} width={550} />;
};

export default Graph;
