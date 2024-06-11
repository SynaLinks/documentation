import React from "react";
import clsx from 'clsx';
import Marquee from "react-fast-marquee";
import styles from './styles.module.css';

type LLMProviderLogo = {
    name: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
};

const LLMProviderLogoList: LLMProviderLogo[] = [
    {
        name: "openai",
        Svg: require('@site/static/img/llm_providers/OpenAI_Logo.svg').default,
    },
    {
        name: "anthropic",
        Svg: require('@site/static/img/llm_providers/Anthropic_logo.svg').default,
    },
    {
        name: "huggingface",
        Svg: require('@site/static/img/llm_providers/hf-logo-with-title.svg').default,
    },
    {
        name: "groq",
        Svg: require('@site/static/img/llm_providers/groq_logo.svg').default,
    },
    {
        name: "mistral",
        Svg: require('@site/static/img/llm_providers/mistral-ai-logo.svg').default,
    },
    {
        name: "ollama",
        Svg: require('@site/static/img/llm_providers/ollama-logo.svg').default,
    },
    {
        name: "cohere",
        Svg: require('@site/static/img/llm_providers/cohere-logo.svg').default,
    },
]

function ProviderLogoMarquee({name, Svg}: LLMProviderLogo) {
    return (
      <div className={clsx('col col--3')}>
        <div className="text--center">
            <Svg className={styles.marqueeSvg} role="img" />
        </div>
      </div>
    );
  }

export default function HomepageMarquee(): JSX.Element {
    return (
    <>
        <div className="text--center">
            <h2>Integrated with your favorite LLM provider</h2>
        </div>
        <div className={styles.marquee}>
            <Marquee gradient={true} >
                {LLMProviderLogoList.map((props, idx) => (
                    <ProviderLogoMarquee key={idx} {...props} />
                ))}
            </Marquee>
        </div>
    </>
    )
}