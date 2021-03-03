import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Navigation/Navbar";
import Sidebar from "../../Navigation/Sidebar";
import logo from "../../../assets/images/pelard.png";
import { ActionCreators } from "../../../Store/ActionCreators"


import "./Styles.scss";
const CaseDetails = (props) => {

  const violation = useSelector((state) => state.singleCase);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const deleteViolationHandler = () => {
    dispatch(ActionCreators.deletingCase(user._id, violation._id, (res) => {
      if (res.success === true) {
        props.history.push('/cases')
      }
    }))
  }
  const updateRedirect = () => {
    props.history.push("/edit-details");
  };

  const role = user.role
  const admin = 'admin'

  let update_link = (<i class="material-icons" onClick={updateRedirect}>
    edit
  </i>)

  if (JSON.stringify(role) !== JSON.stringify(admin)) {
    update_link = null
  }



  const convertDate = (date) => new Date(date).toDateString();
  const involved = violation.involved;
  const responses = violation.authorityResponse;
  const imageUrls = violation.injuries;
  const information = violation.otherInfo;

  return (
    <div>
      <Navbar />
      <div className="case-detail-main">
        <div className="left-column">
          <Sidebar />
        </div>
        <div className="right-column">
          <div className="detail-container">
            <img src={logo} alt="logo" />
            <div className="case-header">
              <h2>Case Deatils</h2>
              <div className="icons">
                <h4>{convertDate(violation.reportedDateAndTime)}</h4>
                <i
                  class="material-icons"
                  onClick={() => dispatch(ActionCreators.generatingPdf(violation._id))}
                >
                  download
                  </i>
                {update_link}
                <i class="material-icons" onClick={deleteViolationHandler}>delete</i>
              </div>
            </div>
            <div className="case-detail">
              <div className="case-detail-row">
                <div className="label">
                  <h4>Reporter's Name: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.reporter && violation.reporter.name}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Phone Number: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.reporter && violation.reporter.contact}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Location: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.location && violation.location.name}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>District: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.location && violation.location.district}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Type of Violation: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.type}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Violation Description: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.description}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Persons Involved: </h4>
                </div>
                <div className="detail-column">
                  {violation.involved &&
                    involved.map((person) => (
                      <div className="detail-column">
                        <div className="detail-row">
                          <div className="row-label">
                            <h5>Name: </h5>
                          </div>
                          <div className="row-text">
                            <h5>{person.name}</h5>
                          </div>
                        </div>
                        <div className="detail-row">
                          <div className="row-label">
                            <h5>Type: </h5>
                          </div>
                          <div className="row-text">
                            <h5>{person.type}</h5>
                          </div>
                        </div>
                        {person.relevantLinks.map((link) => (
                          <div className="relative-column">
                            <h4>Relative links</h4>
                            <div className="relative-row">
                              <div className="relative-label">
                                <h5>Description: </h5>
                              </div>
                              <div className="relative-text">
                                <h5>{link.description}</h5>
                              </div>
                            </div>
                            <div className="relative-row">
                              <div className="relative-label">
                                <h5>Link: </h5>
                              </div>
                              <div className="relative-text">
                                <h5>{link.link}</h5>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Authority Response: </h4>
                </div>
                {violation.authorityResponse &&
                  responses.map((response) => (
                    <div className="detail-column">
                      <div className="detail-row">
                        <div className="row-label">
                          <h5>Name: </h5>
                        </div>
                        <div className="row-text">
                          <h5>{response.name}</h5>
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="row-label">
                          <h5>Type: </h5>
                        </div>
                        <div className="row-text">
                          <h5>{response.response}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Sustained Injury: </h4>
                </div>
                <div className="detail-column">
                  {violation.injuries &&
                    imageUrls.map((injure) => (
                      <div className="detail-column">
                        <div className="detail-row">
                          <div className="row-label">
                            <h5>Injury: </h5>
                          </div>
                          <div className="row-text">
                            <h5>{injure.description}</h5>
                          </div>
                        </div>
                        <div className="detail-row">
                          <div className="row-label">
                            <h5>Link: </h5>
                          </div>
                          <div className="row-text">
                            <img src={injure.link} alt="injury photo" />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Other information: </h4>
                </div>
                <div className="detail-column">
                  {violation.otherInfo &&
                    information.map((info) => (
                      <div className="detail-column">
                        <div className="detail-row">
                          <div className="row-label">
                            <h5>Injury: </h5>
                          </div>
                          <div className="row-text">
                            <h5>{info.description}</h5>
                          </div>
                        </div>
                        <div className="detail-row">
                          <div className="row-label">
                            <h5>Link: </h5>
                          </div>
                          <div className="row-text">
                            <a href={info.link} target="blank">
                              {info.link}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
