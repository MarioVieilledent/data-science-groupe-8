import React from 'react';
import './About.scss';
import DOI_logo from '../../assets/svg/DOI_logo.svg';
import ScientificPub from '../../assets/svg/scientific-pub.svg';
import hIndex from '../../assets/png/h-index.png';
import GooglePatents from '../../assets/png/Google_Patents.png';
import LogoHAL from '../../assets/png/LogoHAL.png';
import GoogleScholar from '../../assets/svg/Google-Scholar.svg';

class About extends React.Component {

  render() {
    return (
      <div className="about flex">
        <div className="blocks flex-col">
          <div className="block flex">
            <div className="left">
              <img className="logo" src={ScientificPub} alt="Logo document scientifique" />
            </div>
            <div className="right flex">
              <span className="title">Publication scientifique</span>
              <span className="paragraph">Une publication scientifique décrit de manièrte détaillée les études et expériences menées et les conclusions qui en sont tirées par les auteurs. Un article est soumis à un examen de la valeur des résultats et de la rigueur de la méthode scientifique employée avant sa publication.</span>
              <span className="paragraph">Une publication scientifique est structurée comme suit.</span>
              <span className="paragraph indent">- Le résumé / Abstract, décrit lobjectif de la recherche ;</span>
              <span className="paragraph indent">- Les mots-clés, améliore le référencement en ligne ;</span>
              <span className="paragraph indent">- Structure de l&apos;article : introduction, méthodologie, résultat, discussion ;</span>
              <span className="paragraph indent">- Fin de l&apos;article : conclusion, remerciments, bibliographie, annexes.</span>
            </div>
          </div>

          <div className="block flex">
            <div className="left">
              <img className="logo" src={GoogleScholar} alt="Logo Google Scholar" />
            </div>
            <div className="right flex">
              <span className="title">Google Scholar</span>
              <span className="paragraph">Google Scholar est un moteur de recherche de Google permettant la recherche d&apos;articles et de publications scientifiques. Il propose des fonctionnalités de recherche telles que la fonctionnalité &quot;cité par&quot; permettant de trouver d&apos;autres articles par proximité.</span>
            </div>
          </div>

          <div className="block flex">
            <div className="left">
              <img className="logo" src={GooglePatents} alt="Logo Google Patents" />
            </div>
            <div className="right flex">
              <span className="title">Google Patents</span>
              <span className="paragraph">Google Patents est un moteur de recherche de Google permettant la recherche de brevets et de demandes de brevet.</span>
            </div>
          </div>

          <div className="block flex">
            <div className="left">
              <img className="logo" src={LogoHAL} alt="Logo HAL" />
            </div>
            <div className="right flex">
              <span className="title">HAL</span>
              <span className="paragraph">L&apos;archive ouverte pluridisciplinaire HAL, est destinée au dépôt et à la diffusion d&apos;articles scientifiques de niveau recherche, publiés ou non, et de thèses, émanant des établissements d&apos;enseignement et de recherche français ou étrangers, des laboratoires publics ou privés.</span>
            </div>
          </div>

          <div className="block flex">
            <div className="left">
              <img className="logo" src={DOI_logo} alt="Logo DOI" />
            </div>
            <div className="right flex">
              <span className="title">DOI - Digital Object Identifier</span>
              <span className="paragraph">Le DOI (identifiant numérique d&apos;objet), standardisé par la norme ISO 26324, est un mécanisme d&apos;identification pérenne de ressources numériques. Il reste invariant alors que les métadonnées liées à la ressource peuvent évoluer.</span>
              <span className="paragraph">Le DOI cible en plus des métadonnées d&apos;une ressource numérique, son adresse URL.</span>
              <span className="paragraph">Il est principalement utilisé pour l&apos;identification d&apos;informations académiques, professionnelles, gouvernementales telles que des articles de journaux, des publications scientifiques, etc.</span>
            </div>
          </div>

          <div className="block flex">
            <div className="left">
              <img className="logo" src={hIndex} alt="Logo h-index" />
            </div>
            <div className="right flex">
              <span className="title">H-index</span>
              <span className="paragraph">Le H-index (indice H) est un indicateur qui reflète à la fois le nombre de publications et le nombre de citations d&apos;un chercheur. Il est une tentative de refléter l&apos;impact des travaux d&apos;un chercheur, proposé en 2005 par Jorge Hirsch.</span>
              <span className="paragraph">Le H-index présente en revanche des limites.</span>
              <span className="paragraph indent">- Le calcul du H-index dépend de la base de données de publications ;</span>
              <span className="paragraph indent">- Un chercheur ayant une longue carrière aura un H-index plus élevé que celui d&apos;un jeune chercheur ;</span>
              <span className="paragraph indent">- Il n&apos;est pas judicieux de comparer des H-index entre plusieurs disciplines, notamment à cause de la quantitié variable de co-auteurs ;</span>
              <span className="paragraph indent">- Le H-index ne prend pas en compte l&apos;apport réel du chercheur dans la publication, car l&apos;ordre des signatures n&apos;est pas analysé.</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default About;