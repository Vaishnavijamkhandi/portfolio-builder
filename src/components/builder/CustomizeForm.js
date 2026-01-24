// src/components/builder/CustomizeForm.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Template1Form from './TemplateForms/Template1Form';
import Template2Form from './TemplateForms/Template2Form';
import Template3Form from './TemplateForms/Template3Form';
import Template4Form from './TemplateForms/Template4Form';
import Template5Form from './TemplateForms/Template5Form';
import Template6Form from './TemplateForms/Template6Form';

const CustomizeForm = () => {
  const { templateId } = useParams();
  
  const renderForm = () => {
    switch(parseInt(templateId)) {
      case 1:
        return <Template1Form />;
      case 2:
        return <Template2Form />;
      case 3:
        return <Template3Form />;
      case 4:
        return <Template4Form />;
      case 5:
        return <Template5Form />;
      case 6:
        return <Template6Form />;
      default:
        return <div className="template-not-found">
          <h2>Template not found</h2>
          <p>Please select a valid template from the dashboard.</p>
        </div>;
    }
  };

  return (
    <div className="customize-form">
      {renderForm()}
    </div>
  );
};

export default CustomizeForm;