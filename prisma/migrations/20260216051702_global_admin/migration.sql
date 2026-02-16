-- CreateIndex
CREATE INDEX "aluno_na_turma_tenantId_idx" ON "aluno_na_turma"("tenantId");

-- CreateIndex
CREATE INDEX "avaliacoes_tenantId_idx" ON "avaliacoes"("tenantId");

-- CreateIndex
CREATE INDEX "cursos_tenantId_idx" ON "cursos"("tenantId");

-- CreateIndex
CREATE INDEX "professor_na_turma_tenantId_idx" ON "professor_na_turma"("tenantId");

-- CreateIndex
CREATE INDEX "roles_tenantId_idx" ON "roles"("tenantId");

-- CreateIndex
CREATE INDEX "turmas_tenantId_idx" ON "turmas"("tenantId");

-- CreateIndex
CREATE INDEX "usuarios_tenantId_idx" ON "usuarios"("tenantId");
