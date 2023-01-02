import React, { Fragment } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
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
              <p className="text-center">Choose option</p>
              <Row>
                <Col md="3"></Col>

                <Col md="6">
                  <RippleButton
                    className="w-100"
                    onClick={() => navigate("/upload-files")}
                  >
                    Upload Files
                  </RippleButton>
                </Col>
                <Col md="3"></Col>
                <Col md="2"></Col>

                <Col md="8">
                  <div className="divider">
                    <div className="divider-text">or</div>
                  </div>
                </Col>
                <Col md="2"></Col>

                <Col md="3"></Col>
                <Col md="6">
                  <RippleButton className="w-100">View Similarity</RippleButton>
                </Col>

                <Col md="3"></Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="3"></Col>
      </Row>
    </Fragment>
  );
}
