// components/ESGReportPDF.tsx
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Registrar fontes (opcional)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4.woff2', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2c3e50',
    paddingBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 12,
    color: '#7f8c8d'
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#bdc3c7',
    paddingBottom: 4
  },
  question: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 4
  },
  answer: {
    fontSize: 10,
    color: '#7f8c8d',
    marginBottom: 12,
    paddingLeft: 10
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#95a5a6'
  }
});

export const ESGReportPDF = ({ answers, esgSections }: { answers: Record<string, string>, esgSections: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Relatório ESG Completo</Text>
        <Text style={styles.subtitle}>Gerado em {new Date().toLocaleDateString()}</Text>
      </View>

      {esgSections.map((section: any, sectionIndex: number) => (
        <View key={sectionIndex} style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>
            {sectionIndex + 1}. {section.title}
          </Text>

          {section.questions.map((question: string, questionIndex: number) => (
            <View key={questionIndex}>
              <Text style={styles.question}>
                {sectionIndex + 1}.{questionIndex + 1} {question}
              </Text>
              <Text style={styles.answer}>
                {answers[`${sectionIndex}-${questionIndex}`] || "Não respondido"}
              </Text>
            </View>
          ))}
        </View>
      ))}

      <Text style={styles.footer} fixed>
        Relatório gerado automaticamente pelo sistema Zeus ESG
      </Text>
    </Page>
  </Document>
);