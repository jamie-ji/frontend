import React, { Fragment } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import RippleButton from "../../@components/ripple-button/index";

export default function Options() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Row className="option-layout m-0">
        <Col md="3"></Col>
        <Col md="6">
          <Card>
            <CardBody>
              <Row>
                <Col md="1"></Col>

                <Col md="10">
                  <img
                    className="img-fluid"
                    src={require("../../@core/images/welcome.webp")}
                    alt=""
                  />
                  <RippleButton
                    className="w-100 mb-3"
                    onClick={() => navigate("/upload-files")}
                  >
                    GO TO APP
                  </RippleButton>
                </Col>

                <Col md="1"></Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="3"></Col>
      </Row>
    </Fragment>
  );
}
