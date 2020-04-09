const createElement = act => {
  const optionElement = document.createElement("OPTION");
  optionElement.text = act.name;
  optionElement.label = act.name;
  optionElement.value = act.name;
  return optionElement;
};

const loadActivities = fn => {
  fetch("/data")
    .then(response => response.json())
    .then(activities => {
      activities.forEach(activity => {
        let activityType = activity.type;
        const activityListElement = document.getElementById(activityType);
        activityListElement.appendChild(createElement(activity));
      });
    })
    .then(fn());
};

export default loadActivities;
