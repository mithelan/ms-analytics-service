{{- define "ms-analytics.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{- define "ms-analytics.fullname" -}}
{{- printf "%s-%s" (include "ms-analytics.name" .) .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{- define "ms-analytics.labels" -}}
app.kubernetes.io/name: {{ include "ms-analytics.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}
