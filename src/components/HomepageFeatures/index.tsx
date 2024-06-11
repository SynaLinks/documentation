import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  // Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Correct the behavior of your Agent without any fine-tuning',
    description: (
      <>
        HybridAGI was designed from the ground up to be easily corrected on the fly.
        By following a Behavior Graph, the Agent solely execute the steps provided.
      </>
    ),
  },
  {
    title: 'Focus only on your Agent logic',
    description: (
      <>
        HybridAGI lets you focus only on your Agent logic by abstracting the prompt engineering.
        Each steps of your agent is optimized for your usecase while ensuring an explainable behavior.
      </>
    ),
  },
  {
    title: 'Powered by an hybrid vector/graph database',
    description: (
      <>
        HybridAGI uses an hybrid vector/graph database to provide long-term memory to your Agent. By combining years of research in human cognition with the power of graphs you can build Agents like never before.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
