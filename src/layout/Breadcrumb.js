import React from "react";
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from "reactstrap";

const Breadcrumbs = (props) => {
	let breadcrumb = props;

	return (
		<Container fluid={true}>
			<div className="page-header">
				<Row>
					<Col lg="6">
						<h3>{breadcrumb.title}</h3>
						<Breadcrumb>
							<BreadcrumbItem>{breadcrumb.parent}</BreadcrumbItem>
							<BreadcrumbItem>{breadcrumb.subparent}</BreadcrumbItem>
							<BreadcrumbItem active>{breadcrumb.title}</BreadcrumbItem>
						</Breadcrumb>
					</Col>
				</Row>
			</div>
		</Container>
	);
};

export default Breadcrumbs;
