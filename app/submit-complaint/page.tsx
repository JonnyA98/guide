'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { submitPositiveReview, submitNegativeReview } from './actions';

const AccessibilityForm = () => {
  const [experience, setExperience] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    reportDate: new Date(),
    isEmployee: '',
    isAnonymous: '',
    description: ''
  });

  // Additional state for bad experience specific fields
  const [accessibilityIssue, setAccessibilityIssue] = useState('');
  const [otherIssue, setOtherIssue] = useState('');
  const [improvements, setImprovements] = useState('');

  // Additional state for good experience specific fields
  const [recommendOthers, setRecommendOthers] = useState('');
  const [inclusiveEnvironment, setInclusiveEnvironment] = useState('');

// Example usage in your form component's handleSubmit:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    if (experience === 'good') {
      const result = await submitPositiveReview({
        company_id: parseInt(formData.companyName), // Assuming companyName contains the ID
        address: formData.companyAddress,
        date_of_incident: format(formData.reportDate, 'yyyy-MM-dd'),
        employee_status: formData.isEmployee === 'yes',
        recommend: recommendOthers === 'yes',
        diverse_environment: inclusiveEnvironment === 'yes',
        description: formData.description
      });

      if (result.error) {
        throw new Error(result.error);
      }
    } else {
      const result = await submitNegativeReview({
        company_id: parseInt(formData.companyName), // Assuming companyName contains the ID
        address: formData.companyAddress,
        date_of_report: format(formData.reportDate, 'yyyy-MM-dd'),
        employee_status: formData.isEmployee === 'yes',
        accessability_issue: parseInt(accessibilityIssue),
        describe: formData.description,
        improvement_suggestions: improvements,
        other_issue: otherIssue,
        anon: formData.isAnonymous === 'yes'
      });

      if (result.error) {
        throw new Error(result.error);
      }
    }

    // Show success message
    alert('Thank you for your feedback!');

    // Reset form
    resetForm();

  } catch (error) {
    console.error('Error submitting feedback:', error);
    alert('Error submitting feedback. Please try again.');
  }
};

const resetForm = () => {
  setExperience('');
  setFormData({
    companyName: '',
    companyAddress: '',
    reportDate: new Date(),
    isEmployee: '',
    isAnonymous: '',
    description: ''
  });
  setAccessibilityIssue('');
  setOtherIssue('');
  setImprovements('');
  setRecommendOthers('');
  setInclusiveEnvironment('');
};

  const renderExperienceSelection = () => (
    <div className="space-y-4">
      <Label>How was your experience?</Label>
      <RadioGroup
        value={experience}
        onValueChange={setExperience}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="good" id="good" />
          <Label htmlFor="good">GOOD</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bad" id="bad" />
          <Label htmlFor="bad">BAD</Label>
        </div>
      </RadioGroup>
    </div>
  );

  const renderCommonFields = () => (
    <div className="space-y-4">
      <div>
        <Label>Company Name</Label>
        <Select
          value={formData.companyName}
          onValueChange={(value) => setFormData({...formData, companyName: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="company1">Company 1</SelectItem>
            <SelectItem value="company2">Company 2</SelectItem>
            {/* Add more companies from your database */}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Company Address</Label>
        <Textarea 
          value={formData.companyAddress}
          onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
        />
      </div>

      <div>
        <Label>Date of Report</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.reportDate ? format(formData.reportDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.reportDate}
              onSelect={(date: any) => setFormData({...formData, reportDate: date})}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label>Are you an employee here?</Label>
        <RadioGroup
          value={formData.isEmployee}
          onValueChange={(value) => setFormData({...formData, isEmployee: value})}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="employee-yes" />
            <Label htmlFor="employee-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="employee-no" />
            <Label htmlFor="employee-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderGoodExperienceFields = () => (
    <div className="space-y-4">
      <div>
        <Label>Based on your experience, would you recommend others to join this company?</Label>
        <RadioGroup
          value={recommendOthers}
          onValueChange={setRecommendOthers}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="recommend-yes" />
            <Label htmlFor="recommend-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="recommend-no" />
            <Label htmlFor="recommend-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Does this company provide an inclusive environment for diverse groups?</Label>
        <RadioGroup
          value={inclusiveEnvironment}
          onValueChange={setInclusiveEnvironment}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="inclusive-yes" />
            <Label htmlFor="inclusive-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="inclusive-no" />
            <Label htmlFor="inclusive-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Please describe how this company has made you feel welcome and included</Label>
        <Textarea 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="h-32"
        />
      </div>
    </div>
  );

  const renderBadExperienceFields = () => (
    <div className="space-y-4">
      <div>
        <Label>What kind of accessibility issue did you face?</Label>
        <Select value={accessibilityIssue} onValueChange={setAccessibilityIssue}>
          <SelectTrigger>
            <SelectValue placeholder="Select issue type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no_ramps">No wheelchair ramps</SelectItem>
            <SelectItem value="no_bathrooms">No accessible bathrooms</SelectItem>
            <SelectItem value="no_tools">Lack of assistive tools</SelectItem>
            <SelectItem value="no_signage">Lack of signage to accessible facilities</SelectItem>
            <SelectItem value="no_braille">Lack of braille signs on elevators</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {accessibilityIssue === 'other' && (
        <div>
          <Label>Please specify the issue</Label>
          <Input
            value={otherIssue}
            onChange={(e) => setOtherIssue(e.target.value)}
          />
        </div>
      )}

      <div>
        <Label>Please describe how this issue affected you</Label>
        <Textarea 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="h-32"
        />
      </div>

      <div>
        <Label>What improvements would you suggest?</Label>
        <Textarea 
          value={improvements}
          onChange={(e) => setImprovements(e.target.value)}
          className="h-32"
        />
      </div>

      <div>
        <Label>Do you want to remain anonymous about this report?</Label>
        <RadioGroup
          value={formData.isAnonymous}
          onValueChange={(value) => setFormData({...formData, isAnonymous: value})}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="anonymous-yes" />
            <Label htmlFor="anonymous-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="anonymous-no" />
            <Label htmlFor="anonymous-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Feedback Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderExperienceSelection()}
          
          {experience && (
            <>
              {renderCommonFields()}
              {experience === 'good' ? renderGoodExperienceFields() : renderBadExperienceFields()}
              
              <Button type="submit" className="w-full">
                Submit Feedback
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default AccessibilityForm;