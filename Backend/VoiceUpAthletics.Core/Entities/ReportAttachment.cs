namespace VoiceUpAthletics.Core.Entities;

/// <summary>
/// Represents a file attachment on a report (stored in Azure Blob Storage)
/// </summary>
public class ReportAttachment : TenantEntity
{
    public int ReportId { get; set; }
    public virtual Report? Report { get; set; }

    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public long FileSizeBytes { get; set; }

    // Azure Blob Storage URL (with SAS token for access)
    public string BlobStorageUrl { get; set; } = string.Empty;
    public string BlobContainerName { get; set; } = string.Empty;
    public string BlobName { get; set; } = string.Empty;

    public int UploadedByUserId { get; set; }
}
