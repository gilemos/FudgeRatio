import showExpectedTime from "../code/expectedTime.js";
import showActivities from "../code/chooseActivities.js";
import showMain from "../code/mainScreen.js";

// Cool intro
document.body.style.opacity = "1";

const App = async () => {
  const activity = await showActivities();
  console.log(activity);

  const expectedTime = await showExpectedTime();
  console.log(expectedTime);

  const ratio = await showMain();
  console.log(ratio);
};

App();
