import { AdminActions } from '../Actions';
import { ActionCreators } from '../ActionCreators';
import { AdminRequest } from '../API';
import { call, put, takeLatest } from 'redux-saga/effects';

//USER REGISTRATION
function* watchUserRegistration() {
	yield takeLatest(AdminActions.USER_REGISTRATION_ACTION, registerUser);
}

function* registerUser({ firstName, lastName, userName, email, password, phoneNumber }) {
	try {
		const response = yield call(() =>
			AdminRequest.userRegistration({ firstName, lastName, userName, email, password, phoneNumber })
		);
		yield put(ActionCreators.userRegistrationSuccess(response));
	} catch (error) {
		yield put(ActionCreators.userRegistrationFail(error));
	}
}

//USER LOGIN
function* watchUserLogin() {
	yield takeLatest(AdminActions.USER_LOGIN_ACTION, loginUser);
}

function* loginUser({ userName, password, callback }) {
	try {
		const response = yield call(() => AdminRequest.userLogin(userName, password));
		yield put(ActionCreators.userLoginSuccess(response));
		callback(response);
	} catch (error) {
		yield put(ActionCreators.userLoginFail(error));
	}
}

//ALL REPORTED CASES
function* watchAllReportedCases() {
	yield takeLatest(AdminActions.ALL_REPORTED_CASES_ACTION, reportedCases);
}

function* reportedCases({ userId, callback }) {
	try {
		const response = yield call(() => AdminRequest.getReportedCases({ userId, callback }));
		if (response.statusCode === 401) {
			callback();
			yield put(ActionCreators.allReportedCasesFail(response));
		} else yield put(ActionCreators.allReportedCasesSuccess(response));
	} catch (error) {
		yield put(ActionCreators.allReportedCasesFail(error));
	}
}

export { watchUserRegistration, watchUserLogin, watchAllReportedCases };
