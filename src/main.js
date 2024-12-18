import { addProfile, removeProfile, calculateAverageAge } from "./actions";
import { createStore } from "redux";
import { profileReducer } from "./profileReducer";

const profileCheckAlertEl = document.querySelector("#profileCheckAlert");
const deleteProfileCheckAlertEL = document.querySelector(
  "#deleteProfileCheckAlert"
);
const addProfileForm = document.querySelector("#addProfile");
const userIdEl = document.querySelector("#userID");
const userNameEl = document.querySelector("#userName");
const userAgeEl = document.querySelector("#userAge");

const removeProfileForm = document.querySelector("#removeProfile");
const removeUserIDEl = document.querySelector("#removeUserID");

const profilesContainerEl = document.querySelector("#profilesContainer");
const avgAgeContainerEl = document.querySelector("#avgAgeContainer");

const store = createStore(profileReducer);

store.subscribe(() => {
  const data = store.getState();
  profilesContainerEl.textContent = "";
  data.profiles.map((profile) => {
    renderProfiles(profile);
  });
  renderAverageAge(data.avgAge);
});

const doesProfileExist = (userId) => {
  const userProfiles = store.getState().profiles;
  if (userProfiles.length > 0) {
    return userProfiles.find((profile) => profile.id === userId);
  }
  return false;
};

const renderProfiles = (profile) => {
  const profileCard = document.createElement("div");
  profileCard.innerHTML = `
  <div class="col">
    <div class="card">
        <div class="row">
            <div class="col">
                <img src="https://placehold.co/450x450?text=Profile+picture" class="img-fluid rounded-start" alt="UserProfilePicture">
            </div>
            <div class="col">
                <div class="card-body">
                    <p class="card-title"><em>${profile.name}</em></p>
                    <p class="card-text"><small><strong class="text-secondary" >ID: </strong>${profile.id}<br/><strong class="text-secondary">Age: </strong>${profile.age}<small></p>
                </div>
            </div>
        </div>
    </div>
</div>
  `;
  profilesContainerEl.appendChild(profileCard);
};

const renderAverageAge = (age) => {
  if (age > 0) {
    avgAgeContainerEl.innerHTML = `
    <p><strong>Average Age: </strong>${age.toFixed(2)}</p>
    `;
  } else {
    avgAgeContainerEl.textContent = "";
  }
};

const showAlertMsg = (message) => {
  return ` <div class="alert alert-danger" role="alert">${message}</div>`;
};

addProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (doesProfileExist(userIdEl.value)) {
    profileCheckAlertEl.innerHTML = showAlertMsg(
      "Profile with ID already present. Please provide a different ID."
    );
    setTimeout(() => {
      profileCheckAlertEl.textContent = "";
    }, 3000);
  } else {
    const userProfileData = {
      id: userIdEl.value,
      name: userNameEl.value,
      age: userAgeEl.value,
    };
    store.dispatch(addProfile(userProfileData));
    store.dispatch(calculateAverageAge());
    userIdEl.value = "";
    userNameEl.value = "";
    userAgeEl.value = "";
  }
});

removeProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!doesProfileExist(removeUserIDEl.value)) {
    deleteProfileCheckAlertEL.innerHTML = showAlertMsg(
      "Profile not present. <br/><small>Please provide valid profile Id to delete profile.<small>"
    );
    setTimeout(() => {
      deleteProfileCheckAlertEL.textContent = "";
    }, 3000);
  } else {
    store.dispatch(removeProfile(removeUserIDEl.value));
    store.dispatch(calculateAverageAge());
    removeUserIDEl.value = "";
  }
});
