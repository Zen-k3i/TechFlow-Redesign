import type { Locale } from "@/i18n/config";
import type { Block } from "../page/blocks";

export type LegalSection = { title: string; blocks: Block[] };
export type LegalDoc = {
  meta: { title: string; description: string };
  badge: string;
  title: string;
  intro: string;
  toc: string;
  sections: LegalSection[];
};

const p = (text: string): Block => ({ type: "p", text });
const h = (text: string): Block => ({ type: "h3", text });
const ul = (...items: string[]): Block => ({ type: "ul", items });

const ADDRESS = "160 Robinson Road, #14-04, Singapore Business Federation Center, Singapore 068914";
const HOST = "Webflow, Inc., 398 11th Street, 2nd Floor, San Francisco, CA 94103";
const EMAIL = "maximilien@techflow-agency.com";

const legalFr: LegalDoc = {
  meta: {
    title: "Mentions légales | TechFlow Agency",
    description: "Mentions légales du site techflow-agency.com : éditeur, hébergement, propriété intellectuelle et données personnelles.",
  },
  badge: "Informations légales",
  title: "Mentions *légales.*",
  intro: "L'identité des intervenants du site techflow-agency.com et les règles qui encadrent son utilisation.",
  toc: "Sommaire",
  sections: [
    {
      title: "Informations sur le site",
      blocks: [
        p("Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, les utilisateurs de techflow-agency.com, site détenu par Techflow Agency PTE LTD, sont informés de l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :"),
        ul(
          "Propriétaire : Techflow Agency PTE LTD",
          `Siège social : ${ADDRESS}`,
          "Numéro d'enregistrement : 929698140",
          `Dirigeant et directeur de la publication : Maximilien Grolier (${EMAIL})`,
          `Hébergement du site : ${HOST}`,
        ),
      ],
    },
    {
      title: "Conditions d'utilisation",
      blocks: [
        p("L'utilisation de techflow-agency.com implique l'acceptation pleine et entière des conditions d'utilisation décrites ci-après. Ces conditions d'utilisation peuvent être modifiées ou complétées à tout moment : les utilisateurs de techflow-agency.com sont donc invités à les consulter régulièrement."),
        p("Le site est normalement accessible aux utilisateurs à tout moment. Une interruption pour maintenance technique peut toutefois être décidée par techflow-agency.com, qui s'efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l'intervention. De la même manière, les mentions légales peuvent être modifiées à tout moment : l'utilisateur est invité à les consulter le plus souvent possible."),
      ],
    },
    {
      title: "Description des services",
      blocks: [
        p("techflow-agency.com a pour objet de fournir une information sur l'ensemble des activités de la société. Techflow Agency s'efforce de fournir sur techflow-agency.com des informations aussi précises que possible. La société ne saurait toutefois être tenue responsable des omissions, des inexactitudes ou des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations."),
      ],
    },
    {
      title: "Limitations techniques",
      blocks: [
        p("Le site utilise la technologie Webflow. Le site ne pourra être tenu responsable de dommages matériels liés à son utilisation. Par ailleurs, l'utilisateur s'engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et doté d'un navigateur à jour."),
      ],
    },
    {
      title: "Propriété intellectuelle",
      blocks: [
        p("Techflow Agency est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logos, icônes, sons et logiciels. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Techflow Agency."),
      ],
    },
    {
      title: "Limitation de responsabilité",
      blocks: [
        p("Techflow Agency ne peut être tenue responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès à techflow-agency.com. Techflow Agency se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans les espaces interactifs qui contreviendrait à la législation française applicable."),
      ],
    },
    {
      title: "Gestion des données personnelles",
      blocks: [
        p("En France, la protection des données personnelles est encadrée par le Règlement général sur la protection des données (RGPD), la loi n° 78-17 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004 et l'article L. 226-13 du Code pénal. Conformément au RGPD, l'utilisateur dispose d'un droit d'accès, de rectification et d'opposition sur ses données personnelles."),
      ],
    },
    {
      title: "Liens hypertextes et cookies",
      blocks: [
        p("Le site techflow-agency.com contient des liens hypertextes vers d'autres sites et décline toute responsabilité quant à ces liens externes, ainsi qu'aux liens créés par d'autres sites vers techflow-agency.com. La navigation sur techflow-agency.com est susceptible d'entraîner l'installation d'un ou plusieurs cookies sur l'ordinateur de l'utilisateur."),
      ],
    },
    {
      title: "Droit applicable et juridiction",
      blocks: [
        p("Tout litige en relation avec l'utilisation de techflow-agency.com est soumis au droit français. Compétence exclusive est attribuée aux tribunaux compétents de Paris."),
      ],
    },
    {
      title: "Principaux textes applicables",
      blocks: [
        ul(
          "Loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés",
          "Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique",
          "Règlement général sur la protection des données (RGPD) (UE) 2016/679",
        ),
      ],
    },
    {
      title: "Glossaire",
      blocks: [
        ul(
          "Utilisateur : tout internaute se connectant au site susnommé et l'utilisant.",
          "Informations personnelles : « les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent ».",
        ),
      ],
    },
  ],
};

const legalEn: LegalDoc = {
  meta: {
    title: "Legal Notice | TechFlow Agency",
    description: "Legal notice for techflow-agency.com: publisher, hosting, intellectual property and personal data.",
  },
  badge: "Legal information",
  title: "Legal *notice.*",
  intro: "Who is behind techflow-agency.com and the rules that govern its use.",
  toc: "Contents",
  sections: [
    {
      title: "About this website",
      blocks: [
        p("In accordance with Article 6 of French Law No. 2004-575 of 21 June 2004 on confidence in the digital economy, users of techflow-agency.com, a website owned by Techflow Agency PTE LTD, are informed of the identity of the parties involved in creating and maintaining it:"),
        ul(
          "Owner: Techflow Agency PTE LTD",
          `Registered office: ${ADDRESS}`,
          "Registration number: 929698140",
          `Director and publication manager: Maximilien Grolier (${EMAIL})`,
          `Hosting: ${HOST}`,
        ),
      ],
    },
    {
      title: "Terms of use",
      blocks: [
        p("Using techflow-agency.com implies full acceptance of the terms of use described below. These terms may be changed or supplemented at any time, so users of techflow-agency.com are invited to review them regularly."),
        p("The website is normally available to users at all times. techflow-agency.com may, however, decide to interrupt it for technical maintenance, in which case it will try to notify users of the date and time beforehand. Likewise, this legal notice may be changed at any time, and users are invited to review it as often as possible."),
      ],
    },
    {
      title: "Description of services",
      blocks: [
        p("techflow-agency.com is intended to provide information about all of the company's activities. Techflow Agency strives to provide information on techflow-agency.com that is as accurate as possible. However, the company cannot be held responsible for omissions, inaccuracies or failures to update, whether caused by itself or by the third-party partners who provide it with this information."),
      ],
    },
    {
      title: "Technical limitations",
      blocks: [
        p("The website is built with Webflow. The website cannot be held responsible for material damage related to its use. Users also agree to access the website using up-to-date, virus-free equipment with a current browser."),
      ],
    },
    {
      title: "Intellectual property",
      blocks: [
        p("Techflow Agency owns the intellectual property rights, or holds the rights of use, for all elements available on the website, including text, images, graphics, logos, icons, sounds and software. Any reproduction, representation, modification, publication or adaptation of all or part of the website, by any means or process, is prohibited without Techflow Agency's prior written permission."),
      ],
    },
    {
      title: "Limitation of liability",
      blocks: [
        p("Techflow Agency cannot be held liable for direct or indirect damage caused to the user's equipment when accessing techflow-agency.com. Techflow Agency reserves the right to remove, without prior notice, any content posted in interactive areas that breaches applicable French law."),
      ],
    },
    {
      title: "Personal data",
      blocks: [
        p("In France, personal data protection is governed by the General Data Protection Regulation (GDPR), Law No. 78-17 of 6 January 1978, Law No. 2004-801 of 6 August 2004 and Article L. 226-13 of the French Criminal Code. Under the GDPR, users have the right to access, rectify and object to the processing of their personal data."),
      ],
    },
    {
      title: "Hyperlinks and cookies",
      blocks: [
        p("techflow-agency.com contains hyperlinks to other websites and accepts no responsibility for these external links, nor for links created by other websites to techflow-agency.com. Browsing techflow-agency.com may result in one or more cookies being stored on the user's computer."),
      ],
    },
    {
      title: "Governing law and jurisdiction",
      blocks: [
        p("Any dispute relating to the use of techflow-agency.com is subject to French law. The competent courts of Paris have exclusive jurisdiction."),
      ],
    },
    {
      title: "Main applicable texts",
      blocks: [
        ul(
          "Law No. 78-17 of 6 January 1978 on information technology, data files and civil liberties",
          "Law No. 2004-575 of 21 June 2004 on confidence in the digital economy",
          "General Data Protection Regulation (GDPR) (EU) 2016/679",
        ),
      ],
    },
    {
      title: "Glossary",
      blocks: [
        ul(
          "User: any internet user who connects to and uses the website named above.",
          "Personal information: “information that allows, in any form whatsoever, directly or indirectly, the identification of the natural persons to whom it applies”.",
        ),
      ],
    },
  ],
};

const termsFr: LegalDoc = {
  meta: {
    title: "Conditions générales | TechFlow Agency",
    description: "Conditions générales de prestation de Techflow Agency PTE LTD : commandes, paiement, propriété intellectuelle, responsabilité et données.",
  },
  badge: "Informations légales",
  title: "Conditions *générales.*",
  intro: "Les présentes conditions générales (« CG ») définissent les droits et obligations de Techflow Agency PTE LTD, exerçant sous la marque commerciale Techflow, ainsi que ceux de ses utilisateurs dans le cadre de l'utilisation de ses services.",
  toc: "Articles",
  sections: [
    {
      title: "Principes",
      blocks: [
        p("Les présentes conditions générales s'appliquent aux prestations réalisées entre professionnels (prestataire / client). Elles constituent le socle unique de la relation commerciale entre les parties, et l'utilisateur est réputé les accepter sans réserve."),
        p("Les présentes conditions générales prévalent sur tout autre document et s'appliquent, sans restriction ni réserve, à l'ensemble des prestations réalisées par Techflow pour ses clients. Techflow se réserve le droit de modifier ses conditions générales à tout moment. Les nouvelles conditions s'appliquent dès leur mise en ligne."),
        h("Identification de la société"),
        ul(
          "Dénomination sociale : Techflow Agency PTE LTD",
          "Nom commercial : Techflow",
          `Siège social : ${ADDRESS}`,
          "Dirigeant : Maximilien Grolier",
          `Contact : ${EMAIL}`,
        ),
      ],
    },
    {
      title: "Contenu et services",
      blocks: [
        p("Les présentes conditions générales définissent les droits et obligations des parties dans le cadre des services proposés par Techflow, notamment :"),
        ul("Création de sites internet", "Conseil en automatisation", "Développement d'applications web et mobiles", "Tout autre service numérique proposé sur le site"),
        p("Ces conditions s'appliquent uniquement aux prestations réalisées en France pour des clients situés sur le territoire français. Pour toute prestation réalisée hors de France, un devis spécifique doit être établi."),
      ],
    },
    {
      title: "Commande et exécution des prestations",
      blocks: [
        p("L'acceptation d'un devis ou la passation d'une commande implique l'adhésion pleine et sans réserve du client aux présentes conditions générales. Pour toute commande, le client doit :"),
        { type: "ol", items: ["Accepter les présentes conditions générales", "Remplir le formulaire de contact ou de demande de devis avec des informations exactes", "Procéder au paiement selon les modalités convenues"] },
        p("Techflow se réserve le droit de refuser ou de suspendre toute prestation en cas :"),
        ul("de défaut de paiement ;", "d'informations inexactes ;", "de demande non conforme à nos services ;", "de force majeure."),
      ],
    },
    {
      title: "Propriété intellectuelle",
      blocks: [
        p("Techflow conserve la propriété de l'ensemble des droits de propriété intellectuelle portant sur les études, dessins, modèles, prototypes et autres éléments réalisés dans le cadre de ses prestations. Il est donc interdit au client de les reproduire ou de les exploiter sans l'autorisation expresse, écrite et préalable de Techflow."),
      ],
    },
    {
      title: "Protection des données personnelles",
      blocks: [
        p("Conformément au Règlement général sur la protection des données (RGPD), Techflow s'engage à :"),
        ul(
          "ne collecter que les données nécessaires à ses prestations ;",
          "protéger les données personnelles des utilisateurs ;",
          "respecter les droits d'accès, de rectification et de suppression des données ;",
          "ne pas divulguer ces informations à des tiers sans autorisation.",
        ),
      ],
    },
    {
      title: "Responsabilité",
      blocks: [
        p("Techflow met en œuvre tous les moyens nécessaires pour que les prestations soient réalisées dans les meilleures conditions. Sa responsabilité ne peut toutefois être engagée en cas :"),
        ul("de force majeure ;", "d'utilisation inappropriée des services par le client ;", "de non-respect des prérequis techniques ;", "d'informations inexactes fournies par le client."),
      ],
    },
    { title: "Hébergement", blocks: [p(`Le site est hébergé par ${HOST}.`)] },
    {
      title: "Litiges",
      blocks: [
        p("Les présentes conditions générales sont régies par le droit français. En cas de litige, une résolution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux de Paris seront seuls compétents."),
      ],
    },
    {
      title: "Modalités et délais de paiement",
      blocks: [
        h("Paiement"),
        p("Le paiement des prestations s'effectue selon les modalités convenues dans le devis ou le bon de commande. Techflow se réserve le droit de suspendre toute prestation en cas :"),
        ul("de refus d'autorisation de paiement ;", "de non-paiement d'une commande précédente ;", "de litige de paiement en cours."),
        p("Une procédure de vérification des paiements est en place afin de garantir la sécurité des transactions. Un justificatif d'identité et un justificatif de domicile peuvent être demandés."),
        h("Retard de paiement"),
        p("Tout retard de paiement rend immédiatement exigible l'intégralité des sommes dues, sans préjudice de toute autre action que Techflow serait en droit d'engager."),
      ],
    },
    {
      title: "Délais de livraison",
      blocks: [
        p("Les délais de livraison sont indiqués au moment de la commande et courent à compter de la date de confirmation de celle-ci. Pour les prestations réalisées en France métropolitaine, le délai standard est de 12 jours ouvrés."),
        p("La responsabilité de Techflow ne peut être engagée en cas de retard dû :"),
        ul("à un cas de force majeure ;", "à des périodes de fermeture annoncées ;", "à une indisponibilité temporaire."),
      ],
    },
    {
      title: "Modalités d'exécution",
      blocks: [
        p("L'exécution des prestations ne commence qu'après :"),
        ul("la confirmation du paiement ;", "la validation du bon de commande ;", "la réception de tous les éléments nécessaires."),
        p("Un document de fin de prestation est établi, permettant au client de formuler ses éventuelles observations."),
      ],
    },
    {
      title: "Obligations de Techflow",
      blocks: [
        p("Techflow s'engage à :"),
        ul(
          "réaliser les prestations conformément aux règles de l'art applicables ;",
          "affecter des professionnels qualifiés aux projets ;",
          "respecter les standards de qualité définis ;",
          "préserver la confidentialité des informations.",
        ),
      ],
    },
    {
      title: "Obligations du client",
      blocks: [
        p("Le client s'engage à :"),
        ul(
          "fournir des informations complètes et exactes ;",
          "prendre ses décisions dans les délais convenus ;",
          "désigner un interlocuteur principal ;",
          "garantir la disponibilité des personnes clés ;",
          "signaler toute difficulté relative à l'exécution des prestations.",
        ),
      ],
    },
    {
      title: "Confidentialité et protection des données",
      blocks: [
        h("Confidentialité"),
        p("Les informations échangées sont considérées comme confidentielles pendant une durée d'un mois suivant la fin des prestations. Cela comprend :"),
        ul("les documents de travail ;", "les rapports et analyses ;", "les informations techniques et commerciales ;", "les méthodologies et le savoir-faire."),
        h("Exclusions"),
        p("Sont exclues de cette obligation de confidentialité :"),
        ul("les informations accessibles au public ;", "les informations obtenues licitement auprès d'autres sources ;", "les informations exigées par les autorités légales."),
      ],
    },
    {
      title: "Propriété intellectuelle des livrables",
      blocks: [
        p("Techflow conserve la propriété intellectuelle sur :"),
        ul("ses créations originales ;", "ses méthodologies et son savoir-faire ;", "ses outils et développements propriétaires."),
        p("Le client bénéficie d'un droit d'usage interne sur les livrables, sans autorisation de :"),
        ul("diffusion commerciale ;", "modification sans accord ;", "cession à des tiers."),
      ],
    },
    {
      title: "Documents et archivage",
      blocks: [
        p("Techflow s'engage à :"),
        ul(
          "conserver les documents originaux transmis ;",
          "les restituer à la demande du client ;",
          "conserver une copie de travail sécurisée ;",
          "respecter la confidentialité des documents.",
        ),
        p("Les documents de travail établis par Techflow demeurent sa propriété et sont couverts par le secret professionnel."),
      ],
    },
    {
      title: "Indépendance",
      blocks: [
        p("Si un conflit d'intérêts ou une question d'indépendance survenait au cours de l'exécution des prestations, Techflow (dénomination sociale : Techflow Agency PTE LTD) en informerait immédiatement l'acheteur et travaillerait avec lui à la recherche de la solution la plus adaptée, dans le respect des règles applicables."),
        p("En particulier, si une évolution de la réglementation ou des normes professionnelles venait à interdire à Techflow de poursuivre ses prestations, Techflow remettrait à l'acheteur les résultats des prestations réalisées ainsi que tous les documents nécessaires à leur achèvement, y compris les documents en l'état, afin d'en faciliter la poursuite par un tiers."),
      ],
    },
    {
      title: "Responsabilité de Techflow",
      blocks: [
        p("La responsabilité globale de Techflow, de son personnel et de ses dirigeants, y compris Maximilien Grolier (dirigeant et directeur de la publication), au titre de tout manquement, négligence ou faute constaté dans l'exécution des prestations, est plafonnée au montant des honoraires réglés pour les prestations concernées. Ce plafond couvre l'ensemble des réclamations de toute nature (intérêts et frais compris), quel que soit le nombre d'actions ou de parties impliquées dans les litiges."),
        p("Cette clause ne s'applique pas en cas de décès, de dommage corporel ou dans les autres cas où la loi interdit d'exclure ou de limiter la responsabilité. La responsabilité de Techflow est limitée aux dommages directs prouvés, à l'exclusion des dommages indirects tels que la perte de profit ou la perte de chance."),
      ],
    },
    {
      title: "Garantie",
      blocks: [
        p("Techflow garantit l'acheteur contre tout défaut de conformité ou vice caché résultant d'un défaut de conception ou d'un défaut dans la fourniture des prestations. Cette garantie exclut toutefois toute négligence ou faute de l'acheteur. Lorsque sa responsabilité est établie, la garantie de Techflow est limitée au montant (hors taxes) réglé par l'acheteur pour la prestation concernée."),
      ],
    },
    {
      title: "Cession et sous-traitance",
      blocks: [
        p("Techflow se réserve le droit de confier tout ou partie de l'exécution des prestations à des sous-traitants répondant aux mêmes exigences de qualification. Si des compétences techniques particulières sont requises, Techflow informera l'acheteur de la possibilité de sous-traiter une partie de la prestation. Le sous-traitant agira sous la responsabilité de Techflow et sera tenu de respecter les obligations de confidentialité liées à la prestation."),
      ],
    },
    {
      title: "Réclamations",
      blocks: [p("Toute réclamation relative à l'exécution des prestations doit être formulée dans un délai d'un an à compter de la fin de la prestation concernée.")],
    },
    {
      title: "Droit de rétractation",
      blocks: [p("L'acheteur étant un professionnel agissant dans le cadre de son activité, le droit de rétractation prévu par le Code de la consommation ne s'applique pas.")],
    },
    {
      title: "Force majeure",
      blocks: [
        p("Toute circonstance échappant au contrôle des parties et empêchant l'exécution normale des obligations est considérée comme une cause d'exonération des obligations des parties. Ces circonstances comprennent notamment les catastrophes naturelles, les perturbations des moyens de transport ou les interruptions des réseaux de télécommunication. Si un cas de force majeure se prolonge au-delà de trois mois, les présentes conditions générales peuvent être résiliées par la partie lésée."),
      ],
    },
    {
      title: "Nullité partielle",
      blocks: [p("Si une ou plusieurs clauses des présentes conditions sont déclarées nulles, les autres clauses conservent toute leur validité et leur portée.")],
    },
    {
      title: "Absence de renonciation",
      blocks: [p("Le fait pour l'une des parties de ne pas se prévaloir d'une clause ne saurait valoir renonciation à ses droits pour l'avenir.")],
    },
    {
      title: "Titres",
      blocks: [p("En cas de divergence d'interprétation entre un titre et le contenu de la clause correspondante, seul le contenu de la clause est pris en compte.")],
    },
    {
      title: "Protection des données personnelles collectées sur le site",
      blocks: [
        p(`Les données personnelles collectées via le site Techflow (dénomination sociale : Techflow Agency PTE LTD, siège social : ${ADDRESS}) comprennent les informations nécessaires à l'utilisation des services, telles que l'adresse e-mail ou les cookies. Ces données servent à la gestion et à l'optimisation du site, hébergé par ${HOST}. Les utilisateurs peuvent exercer leurs droits (accès, rectification, suppression, etc.) en contactant Maximilien Grolier à l'adresse ${EMAIL}.`),
        h("Données collectées"),
        ul(
          "Profil : lors de l'utilisation des services du site, des informations telles qu'une adresse et un numéro de téléphone peuvent être fournies.",
          "Communications : les échanges entre membres via le site sont conservés temporairement.",
          "Cookies : des cookies sont utilisés pour améliorer l'expérience utilisateur. Ils peuvent être désactivés depuis les paramètres du navigateur.",
        ),
        h("Utilisation des données personnelles"),
        p("Les données collectées sont utilisées pour fournir, optimiser et sécuriser les services du site. Elles servent à :"),
        ul(
          "permettre l'accès au site et son utilisation ;",
          "optimiser le fonctionnement du site ;",
          "faciliter les interactions entre utilisateurs ;",
          "assurer le support client ;",
          "personnaliser les services et afficher des publicités ciblées ;",
          "prévenir la fraude et gérer la sécurité ;",
          "résoudre les éventuels litiges ;",
          "envoyer des informations commerciales conformément à vos préférences.",
        ),
        h("Partage des données personnelles avec des tiers"),
        p("Les données personnelles peuvent être partagées dans les cas suivants :"),
        ul(
          "lorsqu'un utilisateur publie des informations dans les espaces publics du site ;",
          "lorsqu'un utilisateur autorise un site tiers à accéder à ses données ;",
          "avec des prestataires externes (publicité, paiements, support), dans le respect des lois applicables ;",
          "pour répondre à des obligations légales ou à des procédures administratives ou judiciaires ;",
          "en cas de fusion, d'acquisition ou de cession d'actifs, les utilisateurs en étant alors informés.",
        ),
        h("Droits des utilisateurs"),
        p(`Conformément au RGPD, vous pouvez exercer vos droits en contactant ${EMAIL}. Ces droits comprennent :`),
        ul(
          "Accès : obtenir vos données personnelles.",
          "Opposition : vous opposer au traitement de vos données.",
          "Portabilité : récupérer vos données dans un format transférable.",
        ),
        h("Modification de la présente clause"),
        p("Le site peut modifier la présente politique à tout moment. En cas de mise à jour, la nouvelle version est publiée sur le site et les utilisateurs sont informés par e-mail au moins 15 jours avant son entrée en vigueur. En cas de refus des nouvelles conditions, vous pouvez supprimer votre compte."),
      ],
    },
    {
      title: "Droit applicable",
      blocks: [
        p("Les présentes conditions générales sont régies par le droit français. Elles sont rédigées en langue française. En cas de traduction dans une ou plusieurs langues, seul le texte français fait foi en cas de litige."),
        p("Les parties s'engagent à rechercher une solution amiable à tout différend pouvant résulter de l'exécution des prestations. À défaut, elles soumettront le litige au tribunal de commerce compétent."),
      ],
    },
  ],
};

const termsEn: LegalDoc = {
  meta: {
    title: "Terms of Service | TechFlow Agency",
    description: "Terms of service of Techflow Agency PTE LTD: orders, payment, intellectual property, liability and data.",
  },
  badge: "Legal information",
  title: "Terms of *service.*",
  intro: "These terms and conditions (the “Terms”) set out the rights and obligations of Techflow Agency PTE LTD, trading as Techflow, and of its users when using its services.",
  toc: "Articles",
  sections: [
    {
      title: "Principles",
      blocks: [
        p("These Terms apply to services provided between professionals (provider / client). They form the sole basis of the commercial relationship between the parties, and the user is deemed to accept them without reservation."),
        p("These Terms prevail over any other document and apply, without restriction or reservation, to all services Techflow provides to its clients. Techflow reserves the right to change its Terms at any time. The new Terms apply as soon as they are published online."),
        h("Company details"),
        ul(
          "Company name: Techflow Agency PTE LTD",
          "Trading name: Techflow",
          `Registered office: ${ADDRESS}`,
          "Director: Maximilien Grolier",
          `Contact: ${EMAIL}`,
        ),
      ],
    },
    {
      title: "Scope and services",
      blocks: [
        p("These Terms set out the rights and obligations of the parties for the services offered by Techflow, including:"),
        ul("Website creation", "Automation consulting", "Web and mobile application development", "Any other digital service offered on the website"),
        p("These Terms apply only to services provided in France for clients located in France. Any service provided outside France requires a specific quote."),
      ],
    },
    {
      title: "Orders and delivery of services",
      blocks: [
        p("Accepting a quote or placing an order means the client fully and unreservedly accepts these Terms. For any order, the client must:"),
        { type: "ol", items: ["Accept these Terms", "Complete the contact or quote request form with accurate information", "Pay according to the agreed terms"] },
        p("Techflow reserves the right to refuse or suspend any service in the event of:"),
        ul("non-payment;", "inaccurate information;", "a request that does not match our services;", "force majeure."),
      ],
    },
    {
      title: "Intellectual property",
      blocks: [
        p("Techflow retains all intellectual property rights in the studies, drawings, models, prototypes and other elements produced as part of its services. The client may therefore not reproduce or use them without Techflow's express, written and prior permission."),
      ],
    },
    {
      title: "Personal data protection",
      blocks: [
        p("In accordance with the General Data Protection Regulation (GDPR), Techflow undertakes to:"),
        ul(
          "collect only the data required for its services;",
          "protect users' personal data;",
          "respect the rights of access, rectification and erasure;",
          "not disclose this information to third parties without permission.",
        ),
      ],
    },
    {
      title: "Liability",
      blocks: [
        p("Techflow uses all necessary means to deliver its services under the best conditions. However, it cannot be held liable in the event of:"),
        ul("force majeure;", "inappropriate use of the services by the client;", "failure to meet technical prerequisites;", "inaccurate information provided by the client."),
      ],
    },
    { title: "Hosting", blocks: [p(`The website is hosted by ${HOST}.`)] },
    {
      title: "Disputes",
      blocks: [
        p("These Terms are governed by French law. In the event of a dispute, an amicable settlement will be sought before any legal action. Failing that, the courts of Paris will have sole jurisdiction."),
      ],
    },
    {
      title: "Payment terms and deadlines",
      blocks: [
        h("Payment"),
        p("Services are paid for according to the terms agreed in the quote or purchase order. Techflow reserves the right to suspend any service in the event of:"),
        ul("a refused payment authorisation;", "non-payment of a previous order;", "an ongoing payment dispute."),
        p("A payment verification procedure is in place to keep transactions secure. Proof of identity and proof of address may be requested."),
        h("Late payment"),
        p("Any late payment makes all amounts owed immediately payable, without prejudice to any other action Techflow may be entitled to take."),
      ],
    },
    {
      title: "Delivery times",
      blocks: [
        p("Delivery times are given when the order is placed and run from the date the order is confirmed. For services provided in mainland France, the standard lead time is 12 working days."),
        p("Techflow cannot be held liable for delays caused by:"),
        ul("force majeure;", "announced closure periods;", "temporary unavailability."),
      ],
    },
    {
      title: "Performance of services",
      blocks: [
        p("Work only begins after:"),
        ul("payment has been confirmed;", "the purchase order has been approved;", "all necessary materials have been received."),
        p("An end-of-service document is issued so the client can share any comments."),
      ],
    },
    {
      title: "Techflow's obligations",
      blocks: [
        p("Techflow undertakes to:"),
        ul("deliver the services in line with applicable professional standards;", "assign qualified professionals to projects;", "meet the defined quality standards;", "keep information confidential."),
      ],
    },
    {
      title: "Client's obligations",
      blocks: [
        p("The client undertakes to:"),
        ul(
          "provide complete and accurate information;",
          "make decisions within the agreed timeframes;",
          "appoint a main point of contact;",
          "ensure key people are available;",
          "report any difficulty with the delivery of the services.",
        ),
      ],
    },
    {
      title: "Confidentiality and data protection",
      blocks: [
        h("Confidentiality"),
        p("Information exchanged is considered confidential for one month after the end of the services. This includes:"),
        ul("working documents;", "reports and analyses;", "technical and commercial information;", "methodologies and know-how."),
        h("Exclusions"),
        p("The following are excluded from this confidentiality obligation:"),
        ul("publicly available information;", "information lawfully obtained from other sources;", "information required by legal authorities."),
      ],
    },
    {
      title: "Intellectual property in deliverables",
      blocks: [
        p("Techflow retains intellectual property in:"),
        ul("its original creations;", "its methodologies and know-how;", "its proprietary tools and developments."),
        p("The client has a right of internal use of the deliverables, without permission for:"),
        ul("commercial distribution;", "modification without agreement;", "transfer to third parties."),
      ],
    },
    {
      title: "Documents and archiving",
      blocks: [
        p("Techflow undertakes to:"),
        ul("keep the original documents provided;", "return them at the client's request;", "keep a secure working copy;", "keep documents confidential."),
        p("Working documents produced by Techflow remain its property and are covered by professional secrecy."),
      ],
    },
    {
      title: "Independence",
      blocks: [
        p("If a conflict of interest or an independence issue arises during the services, Techflow (company name: Techflow Agency PTE LTD) will inform the buyer immediately and work with them to find the most suitable solution, in accordance with applicable rules."),
        p("In particular, if a change in regulations or professional standards prevents Techflow from continuing its services, Techflow will hand over to the buyer the results of the services performed and all documents needed to complete them, including documents in their current state, so that a third party can take over."),
      ],
    },
    {
      title: "Techflow's liability",
      blocks: [
        p("The total liability of Techflow, its staff and its directors, including Maximilien Grolier (director and publication manager), for any breach, negligence or fault in the performance of the services is capped at the amount of fees paid for the services concerned. This cap covers all claims of any kind (including interest and costs), regardless of the number of actions or parties involved."),
        p("This clause does not apply in the event of death, personal injury or other cases where the law prohibits excluding or limiting liability. Techflow's liability is limited to proven direct damage, excluding indirect damage such as loss of profit or loss of opportunity."),
      ],
    },
    {
      title: "Warranty",
      blocks: [
        p("Techflow warrants the buyer against any non-conformity or hidden defect resulting from a design flaw or a defect in the provision of the services. This warranty excludes any negligence or fault on the part of the buyer. Where its liability is established, Techflow's warranty is limited to the amount (excluding tax) paid by the buyer for the service concerned."),
      ],
    },
    {
      title: "Assignment and subcontracting",
      blocks: [
        p("Techflow reserves the right to entrust all or part of the services to subcontractors who meet the same qualification requirements. If specific technical skills are needed, Techflow will inform the buyer that part of the service may be subcontracted. The subcontractor will act under Techflow's responsibility and must comply with the confidentiality obligations attached to the service."),
      ],
    },
    { title: "Claims", blocks: [p("Any claim relating to the performance of the services must be made within one year of the end of the service concerned.")] },
    {
      title: "Right of withdrawal",
      blocks: [p("As the buyer is a professional acting in the course of its business, the right of withdrawal provided for by the French Consumer Code does not apply.")],
    },
    {
      title: "Force majeure",
      blocks: [
        p("Any circumstance beyond the parties' control that prevents the normal performance of obligations releases the parties from those obligations. Such circumstances include natural disasters, transport disruptions and telecommunications network outages. If a force majeure event lasts more than three months, these Terms may be terminated by the affected party."),
      ],
    },
    { title: "Severability", blocks: [p("If one or more clauses of these Terms are declared void, the remaining clauses remain fully valid and in effect.")] },
    { title: "No waiver", blocks: [p("A party's failure to enforce a clause does not constitute a waiver of its rights in the future.")] },
    { title: "Headings", blocks: [p("If a heading and the content of the corresponding clause are interpreted differently, only the content of the clause applies.")] },
    {
      title: "Personal data collected on the website",
      blocks: [
        p(`Personal data collected through the Techflow website (company name: Techflow Agency PTE LTD, registered office: ${ADDRESS}) includes the information needed to use the services, such as email addresses or cookies. This data is used to manage and optimise the website, which is hosted by ${HOST}. Users can exercise their rights (access, rectification, erasure, etc.) by contacting Maximilien Grolier at ${EMAIL}.`),
        h("Data collected"),
        ul(
          "Profile: when using the website's services, information such as an address and phone number may be provided.",
          "Communications: exchanges between members through the website are stored temporarily.",
          "Cookies: cookies are used to improve the user experience. They can be disabled in your browser settings.",
        ),
        h("How personal data is used"),
        p("The data collected is used to provide, optimise and secure the website's services. It is used to:"),
        ul(
          "provide access to and use of the website;",
          "optimise how the website works;",
          "make interactions between users easier;",
          "provide customer support;",
          "personalise services and show targeted advertising;",
          "prevent fraud and manage security;",
          "resolve any disputes;",
          "send commercial information according to your preferences.",
        ),
        h("Sharing personal data with third parties"),
        p("Personal data may be shared in the following cases:"),
        ul(
          "when a user publishes information in public areas of the website;",
          "when a user authorises a third-party website to access their data;",
          "with external providers (advertising, payments, support), in accordance with applicable law;",
          "to meet legal obligations or administrative or judicial procedures;",
          "in the event of a merger, acquisition or asset sale, in which case users will be informed.",
        ),
        h("Users' rights"),
        p(`Under the GDPR, you can exercise your rights by contacting ${EMAIL}. These rights include:`),
        ul("Access: obtain your personal data.", "Objection: object to the processing of your data.", "Portability: receive your data in a transferable format."),
        h("Changes to this clause"),
        p("The website may change this policy at any time. When it is updated, the new version is published on the website and users are informed by email at least 15 days before it takes effect. If you do not accept the new terms, you can delete your account."),
      ],
    },
    {
      title: "Governing law",
      blocks: [
        p("These Terms are governed by French law and written in French. If they are translated into one or more languages, only the French text is binding in the event of a dispute."),
        p("The parties undertake to seek an amicable solution to any dispute arising from the performance of the services. Failing that, they will refer the dispute to the competent commercial court."),
      ],
    },
  ],
};

/**
 * Copied from the old site's /politique-de-cookies and /en/cookie-policy (2026-10-01). That page is itself a
 * placeholder taken from the legal notices (its draft notice was removed here on request), pending the real policy.
 */
const cookiesFr: LegalDoc = {
  meta: { title: "Politique de cookies | TechFlow Agency", description: "Les cookies utilisés par TechFlow Agency, le rôle de chacun, leur durée de conservation et la façon de modifier votre consentement à tout moment." },
  badge: "Informations légales",
  title: "Politique de *cookies.*",
  intro: "Les cookies déposés lors de la navigation sur techflow-agency.com et vos droits.",
  toc: "Sommaire",
  sections: [
    {
      title: "Informations sur le site",
      blocks: [
        p("Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, les utilisateurs de techflow-agency.com, site détenu par Techflow Agency PTE LTD, sont informés de l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :"),
        p("Propriétaire : Techflow Agency PTE LTD"),
        p("Siège social : 229 160 ROBINSON ROAD, #14-04, SINGAPORE BUSINESS FEDERATION CENTER, SINGAPORE 068914"),
        p("Numéro d'enregistrement : 929698140"),
        p("Dirigeant et directeur de la publication : Maximilien Grolier – maximilien@techflow-agency.com"),
        p("Hébergement du site : Webflow, Inc. 398 11th Street, 2nd Floor San Francisco, CA 94103"),
      ],
    },
    {
      title: "Conditions d'utilisation",
      blocks: [
        p("L'utilisation de techflow-agency.com implique l'acceptation pleine et entière des conditions d'utilisation décrites ci-après. Ces conditions d'utilisation peuvent être modifiées ou complétées à tout moment : les utilisateurs de techflow-agency.com sont donc invités à les consulter régulièrement."),
        p("Le site est normalement accessible aux utilisateurs à tout moment. Une interruption pour maintenance technique peut toutefois être décidée par techflow-agency.com, qui s'efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l'intervention."),
        p("De la même manière, les mentions légales peuvent être modifiées à tout moment : l'utilisateur est invité à les consulter le plus souvent possible."),
      ],
    },
    {
      title: "Description des services",
      blocks: [
        p("techflow-agency.com a pour objet de fournir une information sur l'ensemble des activités de la société. Techflow Agency s'efforce de fournir sur techflow-agency.com des informations aussi précises que possible. La société ne saurait toutefois être tenue responsable des omissions, des inexactitudes ou des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations."),
      ],
    },
    {
      title: "Limitations techniques",
      blocks: [
        p("Le site utilise la technologie Webflow. Le site ne pourra être tenu responsable de dommages matériels liés à son utilisation. Par ailleurs, l'utilisateur s'engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et doté d'un navigateur à jour."),
      ],
    },
    {
      title: "Propriété intellectuelle",
      blocks: [
        p("Techflow Agency est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logos, icônes, sons et logiciels. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Techflow Agency."),
      ],
    },
    {
      title: "Limitation de responsabilité",
      blocks: [
        p("Techflow Agency ne peut être tenue responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès à techflow-agency.com."),
        p("Techflow Agency se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans les espaces interactifs qui contreviendrait à la législation française applicable."),
      ],
    },
    {
      title: "Gestion des données personnelles",
      blocks: [
        p("En France, la protection des données personnelles est encadrée par le Règlement général sur la protection des données (RGPD), la loi n° 78-17 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004 et l'article L. 226-13 du Code pénal."),
        p("Conformément au RGPD, l'utilisateur dispose d'un droit d'accès, de rectification et d'opposition sur ses données personnelles."),
      ],
    },
    {
      title: "Liens hypertextes et cookies",
      blocks: [
        p("Le site techflow-agency.com contient des liens hypertextes vers d'autres sites et décline toute responsabilité quant à ces liens externes, ainsi qu'aux liens créés par d'autres sites vers techflow-agency.com."),
        p("La navigation sur techflow-agency.com est susceptible d'entraîner l'installation d'un ou plusieurs cookies sur l'ordinateur de l'utilisateur."),
      ],
    },
    {
      title: "Droit applicable et juridiction",
      blocks: [
        p("Tout litige en relation avec l'utilisation de techflow-agency.com est soumis au droit français. Compétence exclusive est attribuée aux tribunaux compétents de Paris."),
      ],
    },
    {
      title: "Principaux textes applicables",
      blocks: [
        ul("Loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés", "Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique", "Règlement général sur la protection des données (RGPD) (UE) 2016/679"),
      ],
    },
    {
      title: "Glossaire",
      blocks: [
        ul("Utilisateur : Tout internaute se connectant au site susnommé et l'utilisant", "Informations personnelles : « Les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent »"),
      ],
    },
  ],
};

const cookiesEn: LegalDoc = {
  meta: { title: "Cookie Policy | TechFlow Agency", description: "Which cookies TechFlow Agency uses, what each one does, how long it lasts, and how you can change your consent at any time." },
  badge: "Legal information",
  title: "Cookie *policy.*",
  intro: "The cookies set when browsing techflow-agency.com and your rights.",
  toc: "Contents",
  sections: [
    {
      title: "About this website",
      blocks: [
        p("Pursuant to Article 6 of French Law No. 2004-575 of June 21, 2004, regarding confidence in the digital economy, users of techflow-agency.com, owned by Techflow Agency PTE LTD, are informed of the identity of the various parties involved in its creation and monitoring:"),
        p("Owner: Techflow Agency PTE LTD"),
        p("Registered office: 229 160 ROBINSON ROAD, #14-04, SINGAPORE BUSINESS FEDERATION CENTER, SINGAPORE 068914"),
        p("Registration number: 929698140"),
        p("CEO and Publication Director: Maximilien Grolier – maximilien@techflow-agency.com"),
        p("Website Hosting: Webflow, Inc. 398 11th Street, 2nd Floor San Francisco, CA 94103"),
      ],
    },
    {
      title: "Terms and Conditions of Use",
      blocks: [
        p("The use of techflow-agency.com implies full acceptance of the terms and conditions of use described below. These terms of use may be modified or supplemented at any time; therefore, users of techflow-agency.com are invited to consult them regularly."),
        p("The site is normally accessible to users at all times. However, techflow-agency.com may decide to interrupt access for technical maintenance and will endeavor to inform users in advance of maintenance dates and times."),
        p("Similarly, the legal notice may be modified at any time: users are encouraged to refer to it as often as possible."),
      ],
    },
    {
      title: "Description of Services",
      blocks: [
        p("The purpose of techflow-agency.com is to provide information about all activities of the company. Avia Creative Solutions strives to provide accurate information on techflow-agency.com. However, it cannot be held responsible for omissions, inaccuracies, or outdated information, whether caused by itself or third-party partners who provide this information."),
      ],
    },
    {
      title: "Technical Limitations",
      blocks: [
        p("The website uses Webflow technology. The website cannot be held liable for any material damage related to the use of the site. Furthermore, users commit to accessing the site using recent equipment, free from viruses, and with an up-to-date browser."),
      ],
    },
    {
      title: "Intellectual Property",
      blocks: [
        p("Avia Creative Solutions owns the intellectual property rights or holds usage rights for all elements accessible on the site, including texts, images, graphics, logos, icons, sounds, and software. Any reproduction, representation, modification, publication, or adaptation of all or part of the site elements, regardless of the means or process used, is prohibited without prior written authorization from Avia Creative Solutions."),
      ],
    },
    {
      title: "Liability Limitations",
      blocks: [
        p("Avia Creative Solutions cannot be held liable for direct or indirect damage to users' equipment while accessing techflow-agency.com."),
        p("Avia Creative Solutions reserves the right to remove, without prior notice, any content posted in interactive spaces that would violate applicable French legislation."),
      ],
    },
    {
      title: "Personal Data Management",
      blocks: [
        p("Personal data protection in France is governed by the General Data Protection Regulation (GDPR), Law No. 78-87 of January 6, 1978, Law No. 2004-801 of August 6, 2004, and Article L. 226-13 of the Criminal Code."),
        p("In accordance with the GDPR, users have the right to access, rectify, and oppose their personal data."),
      ],
    },
    {
      title: "Hyperlinks and Cookies",
      blocks: [
        p("The techflow-agency.com website contains hyperlinks to other websites and disclaims any responsibility regarding these external links or links created by other sites to techflow-agency.com."),
        p("Browsing techflow-agency.com may result in the installation of cookie(s) on the user's computer."),
      ],
    },
    {
      title: "Applicable Law and Jurisdiction",
      blocks: [
        p("Any dispute relating to the use of techflow-agency.com is subject to French law. Exclusive jurisdiction is given to the competent courts of Paris."),
      ],
    },
    {
      title: "Key Applicable Laws",
      blocks: [
        ul("French Law No. 78-17 of January 6, 1978, on Information Technology, Data Files, and Civil Liberties", "French Law No. 2004-575 of June 21, 2004, on Confidence in the Digital Economy", "General Data Protection Regulation (GDPR) (EU) 2016/679"),
      ],
    },
    {
      title: "Glossary",
      blocks: [
        ul("User: Any internet user connecting to and using the aforementioned website", "Personal Information: \"Information that allows, in any form whatsoever, directly or indirectly, the identification of the natural persons to whom it applies\""),
      ],
    },
  ],
};

/**
 * Copied from the old site's /politique-de-confidentialite and /en/privacy-policy (2026-10-02): the same
 * placeholder text as the cookie policy (taken from the legal notices), with its own title and meta.
 * Replace with the real privacy policy (the contact forms collect personal data).
 */
const privacyFr: LegalDoc = {
  ...cookiesFr,
  meta: { title: "Politique de confidentialité | TechFlow Agency", description: "Comment TechFlow Agency collecte, utilise et protège vos données personnelles, vos droits au titre du RGPD et la façon de nous contacter à ce sujet." },
  title: "Politique de *confidentialité.*",
  intro: "Les données personnelles collectées sur techflow-agency.com et vos droits.",
};

const privacyEn: LegalDoc = {
  ...cookiesEn,
  meta: { title: "Privacy Policy | TechFlow Agency", description: "How TechFlow Agency collects, uses and protects your personal data, your rights under GDPR, and how to contact us about them." },
  title: "Privacy *policy.*",
  intro: "The personal data collected on techflow-agency.com and your rights.",
};

export type LegalKey = "legal" | "terms" | "cookies" | "privacy";

export const legalDocs: Record<LegalKey, Record<Locale, LegalDoc>> = {
  legal: { fr: legalFr, en: legalEn },
  terms: { fr: termsFr, en: termsEn },
  cookies: { fr: cookiesFr, en: cookiesEn },
  privacy: { fr: privacyFr, en: privacyEn },
};
