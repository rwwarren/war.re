import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Experience from "../../components/Experience";
import Activity from "../../components/Activity";
import ActivityList from "@/components/ActivityList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ryan Warren Resume</title>
        <meta name="description" content="Ryan Warren's Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <div className={styles.content}>
              <div className={styles.header}>
                  <h1>Ryan Warren</h1>
                  <a href="https://www.linkedin.com/in/ryanwwarren" target="_blank">linkedin.com/in/ryanwwarren</a><div className={styles.spacing}>•</div>ryan@war.re <div className={styles.spacing}>•</div> <a href="https://github.com/rwwarren" target="_blank">github.com/rwwarren</a>
              </div>
              <Experience heading={"Technical Experience"}/>
              <ActivityList items={
                  ['Programming experience with Java, git, Bash, Linux, Scala, PHP, Apache, MySQL, Go, React, Ruby, and C++',
                      'Desire to develop more web & mobile programming experience',
                      'Favorite editors are vim, IntelliJ & vscode']} />
              <Experience heading={"Relevant Work Experience"}/>
              <Activity name={"Software Engineer, Stripe (Internal Tools)"} start={"March 2021"} end={"Present"}
                items={['Internal Tools for Stripes to complete their jobs']}
                />
              <Activity name={"Software Engineer II, Amazon (Ads)"} start={"July 2019"} end={"February 2021"}
                items={['Built the library used to connect advertisements across the entire stack in under 3 milliseconds',
                'Mentor interns and junior engineers to help them achieve their career goals',
                'Designed and implemented cross organization projects to improve monetization, fill rate and latency']} />
              <Activity name={"Software Engineer, Amazon (Ads)"} start={"July 2017"} end={"June 2019"}
                        items={['Rebuilt and own the advertising configuration frontend service which is used for millions of dollars of revenue',
                        'Onboarded and worked with partner teams to implement our services onto their Amazon page',
                        'Created tools which save page owners and program managers hours when creating or reporting on ads']} />
              <Activity name={"Software Engineer II, Porch"} start={"August 2016"} end={"July 2017"}
                        items={['Built tools to manage billing of our clients to reduce reliance on manual salesperson management',
                            'Created and own the subscription administration service, which delivers our product to consumers',
                            'Worked to integrate lead distribution pacing that increased homeowner delight with our product']} />
              <Activity name={"Software Engineer, Porch"} start={"July 2015"} end={"August 2016"}
                        items={['Designed and implemented APIs for clients to access all necessary data, which improved user experience',
                        'Enhanced accuracy of ecommerce system while creating testing tools',
                        'Wrote tools to more accurately categorize leads submitted, thereby improving efficiency of distribution']} />
              <Activity name={"Software Engineer Intern, Live Nation"} start={"March 2015"} end={"June 2015"}
                        items={['Involved in developing applications for purchasing tickets from computers and mobile devices, through the core systems that process the order, and out to metrics and monitoring tools',
                        'Participated in all aspects of the development process including planning, design, implementation, and support',
                        'Committed code on highly scalable applications generating millions of dollars in revenue every day']} />
              <Activity name={"Software Engineer Intern, Live Nation"} start={"June 2014"} end={"December 2014"}
                        items={['Involved in developing applications for purchasing tickets from computers and mobile devices, through the core systems that process the order, and out to metrics and monitoring tools',
                            'Participated in all aspects of the development process including planning, design, implementation, and support',
                            'Committed code on highly scalable applications generating millions of dollars in revenue every day']} />
              <Activity name={"Web Development Intern, Sporcle"} start={"June 2013"} end={"June 2014"}
                        items={['Designed and implemented a 3rd party API in PHP to allow 3 companies access to game data',
                        'Created API authentication and rate limiting with Redis to control access companies using the API',
                        'Improved server testing by creating an endpoint testing application using PHP and cURL to ensure different endpoints on the site are up and running',
                        'Learned Objective C by delving through current applications to create new game applications']} />
              <Activity name={"Technical Student Assistant, University of Washington"} start={"June 2012"} end={"October 2013"}
                        items={['Troubleshot application and network issues by using research to ensure computer uptime',
                        'Imaged and configured hundreds of machines for students use to guarantee student access to tools',
                        'Installed and administered 12 physical servers which upgraded current backend infrastructure',
                        'Trained 2 new employees through hands-on work to strengthen capability of independent work']} />
              <Experience heading={"Related Activities"}/>
              <Activity name={<a href="https://github.com/rwwarren/door-lock/">PiDuinoLock</a>} start={"July 2013"} end={"May 2017"}
                        items={['Created an automated door deadbolt using a Raspberry Pi and Arduino, which unlocks a door',
                        'Programmed in Java, Objective C, Arduino implementation of Wiring, PHP, and MySQL learn integration',
                        <>Utilized 3rd party API (<a href="https://www.authy.com/">authy</a>) for 2 factor authentication to learn about implementing security</>,
                        <>Planned to expand easily to use Bluetooth and a <a href="https://www.nymi.com/">Nymi</a> by using object oriented design</>]} />
              <Activity name={"Coursework: Data Structures and Algorithms"} start={"January 2013"} end={"June 2014"}
                        items={['Implemented a HashMap with an array using separate chaining increasing knowledge of Java',
                        'Created a Heap with a comparator and deque to solve a maze using an array to learn about deques',
                        'Drew stars on a drawingpanel using guava collections to understand how to use Java collections',
                        'Implemented breadth first search, depth first search, and Dijkstra\'s algorithm to a graph class',
                        'Modified a quicksort algorithm and used runtimes to compare sorting algorithms to learn benefits of each']} />
              <Activity name={"Web Programming"} start={"January 2010"} end={"Present"}
                        items={[<>Operated websites like <a href="https://wrixton.net">wrixton.net</a>, <a href="https://wrixton.com">wrixton.com</a>, and <a href="https://wrixton.xyz">wrixton.xyz</a> for {(new Date().getFullYear() - 2010)} years using a host service to learn about web hosting and programming</>,
                        'Created blog and fraternity website using WordPress and phpBB to build codeless sites with tools',
                        'Realized about source control and merging by using bitbucket and github for Git source control which helped']} />

              <Experience heading={"Education"}/>
              <Activity name={"Bachelor of Science in Computer Science and Software Engineering University of Washington:"} end={"Graduated June 2015"}
                        items={['Relevant Courses: Object oriented programming, software engineering techniques, management principles, algorithms in C++, data structures in Java, and algorithms in Java']} />
          </div>
      </main>
    </>
  )
}
