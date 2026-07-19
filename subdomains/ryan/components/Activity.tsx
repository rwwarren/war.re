import { ReactNode } from 'react'
import styles from '@/styles/Home.module.css'
import ActivityList from '@/components/ActivityList'
import { addMonths, intervalToDuration, isValid, parse, startOfMonth } from 'date-fns'
import pluralize from 'pluralize'

type ActivityProps = {
  name: string | ReactNode
  company?: string
  team?: string
  start?: string
  end: string
  items: Array<string | ReactNode>
  companyLink?: string
}

function formatDuration(start: string, end: string): string | null {
  const startDate = parse(start, 'MMMM yyyy', new Date())
  const endDate =
    end.toLowerCase() === 'present' ? startOfMonth(new Date()) : parse(end, 'MMMM yyyy', new Date())
  if (!isValid(startDate) || !isValid(endDate) || startDate > endDate) return null
  // Count months inclusively (LinkedIn-style): March 2021 - February 2024 is a
  // 3-year stint, so the end month itself counts as a worked month.
  const interval = intervalToDuration({
    start: startDate,
    end: addMonths(endDate, 1),
  })
  const parts = []
  if (interval.years && interval.years > 0)
    parts.push(`${interval.years} ${pluralize('Year', interval.years)}`)
  if (interval.months && interval.months > 0)
    parts.push(`${interval.months} ${pluralize('Month', interval.months)}`)
  return parts.length > 0 ? parts.join(' ') : null
}

export default function Activity(props: ActivityProps) {
  const duration = props.start ? formatDuration(props.start, props.end) : null
  return (
    <div className={styles.activity}>
      <div className={styles.title}>
        <h3>
          {props.name}
          {props.company ? `, ` : ''}
          {props.companyLink ? (
            <a href={props.companyLink} target="_blank" rel="noopener noreferrer">
              {props.company}
            </a>
          ) : (
            props.company
          )}
          {props.team ? ` (${props.team})` : ''}
        </h3>
        {duration && <span className={styles.duration}>[{duration}]</span>}
      </div>
      <div className={styles.date}>
        {props.start}
        {props.start && props.end ? ' - ' : ''}
        {props.end}
      </div>
      <ActivityList items={props.items} />
    </div>
  )
}
