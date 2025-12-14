async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const AuditRegistry = await ethers.getContractFactory("AuditRegistry");
  const registry = await AuditRegistry.deploy();
  await registry.deployed();
  console.log("Registry:", registry.address);

  const AuditCertificate = await ethers.getContractFactory("AuditCertificate");
  const cert = await AuditCertificate.deploy(registry.address);
  await cert.deployed();
  console.log("Certificate:", cert.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
