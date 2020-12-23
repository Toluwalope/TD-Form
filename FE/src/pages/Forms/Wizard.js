import React from 'react';

// core components
import Wizard from '../../components/Wizard/Wizard.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import GridItem from '../../components/Grid/GridItem.js';

import MetaData from './WizardSteps/MetaData.js';
import ProjectDetails from './WizardSteps/ProjectDetails.js';
import ProjectTimeline from './WizardSteps/ProjectTimeline.js';
import Commercials from './WizardSteps/Commercials.js';
import Competition from './WizardSteps/Competition.js';
import Commitment from './WizardSteps/Commitment.js';
import Negotiation from './WizardSteps/Negotiation.js';
import DesignElement from './WizardSteps/DesignElement.js';
import Others from './WizardSteps/Others.js';

export default function WizardView(props) {
	const handleSubmit = (e) => {
		console.log(props);
		alert(JSON.stringify(props));
	};

	return (
		<GridContainer justify="center">
			<GridItem xs={12} sm={8}>
				<Wizard
					validate
					steps={[
						{ stepName: 'Meta Data', stepComponent: MetaData, stepId: 'metaData' },
						{ stepName: 'Details', stepComponent: ProjectDetails, stepId: 'projectDetails' },
						{ stepName: 'Timeline', stepComponent: ProjectTimeline, stepId: 'projectTimeline' },
						{ stepName: 'Commercial', stepComponent: Commercials, stepId: 'commercials' },
						{ stepName: 'Commitment', stepComponent: Commitment, stepId: 'commitment' },
						{ stepName: 'Competition', stepComponent: Competition, stepId: 'competition' },

						{ stepName: 'Negotiation', stepComponent: Negotiation, stepId: 'negotiation' },
						{ stepName: 'Design', stepComponent: DesignElement, stepId: 'designElement' },
						{ stepName: 'Others', stepComponent: Others, stepId: 'others' }
					]}
					title=""
					subtitle=""
					finishButtonClick={handleSubmit}
				/>
			</GridItem>
		</GridContainer>
	);
}
