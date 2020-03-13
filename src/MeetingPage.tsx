import React from 'react';
import { 
  Stack, Text, FontWeights, PrimaryButton, DefaultButton, StackItem, TextField, DatePicker, 
  IDatePickerStrings, DayOfWeek, initializeIcons, ComboBox, IComboBoxOption, IComboBox } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { AppState } from './RootReducer'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import * as _ from 'lodash';
import moment, { Moment } from 'moment'
import { OnlineMeetingInput } from './meeting-creator/models';
import { SET_MEETING_COMMAND, CREATE_MEETING_COMMAND, CreateMeetingCommand } from './meeting-creator/actions';
import { goBack } from 'connected-react-router';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };
initializeIcons(); //TODO: move to root. 

const DayPickerStrings: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker'
};
const meetingIconClass = mergeStyles({
  fontSize: 16,
  height: 16,
  width: 16,
  margin: '0 7px',
  position: 'relative',
  top: 1,
  backgroundColor: '#6264a7',
  padding: '10px',
  color: '#fff',
  borderRadius: '3px'
});

const inputIconClass = mergeStyles({
  position: 'relative',
  top: 7,
});

//
// Date and time picker component
//

interface DateTimePickerProps {
  dateTime?: Moment
  onTimeUpdated: (date?: Moment) => void
}

const timeSuggestions = _.range(0, 1440, 30)
  .map(minutes => ({
    key: minutes,
    text: moment().startOf('day').minutes(minutes).format("h:mm A")
  }));

function DateTimePicker(props: DateTimePickerProps) {
  function onDayPicked(date: Date | null | undefined) {
    const nextDateTime = date ?? props.dateTime?.clone();
    // get the delta of minutes from the start of the day
    const offset = moment.duration(props.dateTime?.clone().diff(props.dateTime?.clone().startOf('day')));
    const updatedNextDateTime = moment(nextDateTime).startOf('day').add(offset);
    props.onTimeUpdated(updatedNextDateTime);
  }

  function onTimePicked(event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined) {
    const offset = moment.duration(option?.key, 'minutes');
    
    const nextTime = moment(props.dateTime).startOf('day').add(offset);
    props.onTimeUpdated(nextTime)
  }

  const defaultMinuteKey = moment(props.dateTime).startOf('hour').diff(moment(props.dateTime).startOf('day'), 'minutes');
  return (
    <Stack horizontal>
      <DatePicker firstDayOfWeek={DayOfWeek.Sunday} strings={DayPickerStrings} ariaLabel="Select a date" value={props.dateTime?.toDate()} onSelectDate={onDayPicked}/>
      <ComboBox allowFreeform={true} autoComplete="on" options={timeSuggestions} onChange={onTimePicked} defaultSelectedKey={defaultMinuteKey} />
    </Stack>
  )
}


//
// Meeting page component
//

interface MeetingPageProps {
  meeting: OnlineMeetingInput,
  setMeeting: (meeting: OnlineMeetingInput) => void,
  createMeeting: (meeting: OnlineMeetingInput) => void,
  cancel: () => void,
}

const mapStateToProps = (state : AppState) => ({
  meeting: state.meeting?.inputMeeting
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMeeting: (meeting: OnlineMeetingInput) => {
    dispatch({
      type: SET_MEETING_COMMAND,
      meeting
    })
  },
  createMeeting: (meeting: OnlineMeetingInput) => {
    dispatch({
      type: CREATE_MEETING_COMMAND,
      fromPage: "meeting",
      meeting
    } as CreateMeetingCommand)
  },
  cancel: () => dispatch(goBack()),
});

function MeetingPageComponent(props: MeetingPageProps) {

  function onSubjectChanged(evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined)
  {
    // The meeting objects are small, cloning is cheap enough
    // Normally would use immutable records or similar to avoid overhead.
    const nextMeeting = _.cloneDeep(props.meeting);
    nextMeeting.subject = newValue ?? '';
    props.setMeeting(nextMeeting);
  }

  function onStartDateSelected(date?: Moment)
  {
    const nextMeeting = _.cloneDeep(props.meeting);
    nextMeeting.startDateTime = date ?? nextMeeting.startDateTime;
    props.setMeeting(nextMeeting);
  }

  function onEndDateSelected(date?: Moment)
  {
    const nextMeeting = _.cloneDeep(props.meeting);
    nextMeeting.endDateTime = date ?? nextMeeting.endDateTime;
    props.setMeeting(nextMeeting);
  }

  return (
    <Stack
      className="container"
      verticalFill
      tokens={{
        childrenGap: 35
      }} >
      <Stack horizontal tokens={{childrenGap: 15}}>
        <StackItem grow>
          <FontIcon iconName="Calendar" className={meetingIconClass} />
          <Text variant="xLarge" styles={boldStyle}>
            New meeting link
          </Text>
        </StackItem>
        <StackItem align="end">
          <Stack horizontal tokens={{childrenGap: 10}}>
            <PrimaryButton className="teamsButton" primary text="Create" onClick={() => props.createMeeting(props.meeting)} />
            <DefaultButton className="teamsButtonInverted" text="Cancel" onClick={() => props.cancel()}/>
          </Stack>
        </StackItem>
      </Stack>
      <Stack horizontal>
        <StackItem className="newMeetingInputIcon"><FontIcon iconName="Edit" className={inputIconClass} /></StackItem>
        <StackItem grow>
          <TextField className="newMeetingInput" placeholder="Event Name" value={props.meeting?.subject} underlined onChange={onSubjectChanged}/>
        </StackItem>
      </Stack>

      <Stack horizontal tokens={{childrenGap: 15}}>
        <FontIcon iconName="Clock" className={inputIconClass} />
        <DateTimePicker dateTime={props.meeting?.startDateTime?.clone()} onTimeUpdated={onStartDateSelected} />
        <DateTimePicker dateTime={props.meeting?.endDateTime?.clone()} onTimeUpdated={onEndDateSelected} />
      </Stack>
      {/* Include the element below if your integration creates an event in the course calendar
        <Text variant="medium">We will create an event which includes a Microsoft Teams meeting link on your course calendar.</Text> */}
    </Stack>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPageComponent);
